<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h4>
          <span class="header-name">{{ chocolate.name }}</span> from
          <span class="header-brand">{{ chocolate.brand }}</span>
        </h4>
        <router-link
          class="choco-link"
          :to="{
            name: 'DetailView',
            params: {
              id: chocolate.id,
              name: chocolate.name,
              brand: chocolate.brand,
              chocolate: JSON.stringify(chocolate),
              cheapest: cheapestChocolate.link,
              fat: chocolate.nutrition.fat.total,
              carbohydrates: chocolate.nutrition.carbohydrates.total,
              protein: chocolate.nutrition.protein,
              salt: chocolate.nutrition.salt,
            },
          }"
        >
          <el-button class="pilot-button" plain>Details</el-button>
        </router-link>
      </div>
    </template>
    <template v-if="cheapestChocolate.price">
      <el-descriptions
        class="price-info"
        direction="vertical"
        :column="3"
        border
      >
        <el-descriptions-item align="center" label="Lowest price per 100g:">{{
          Math.round((cheapestChocolate.price + Number.EPSILON) * 100) / 100 +
          "€"
        }}</el-descriptions-item>
        <el-descriptions-item align="center" label="Average price per 100g:">{{
          Math.round((averagePrice + Number.EPSILON) * 100) / 100 + "€"
        }}</el-descriptions-item>
        <el-descriptions-item align="center" label="Link to the cheapest shop:">
          <a
            style="text-decoration: none"
            class="visit-shop"
            :href="cheapestChocolate.link"
            target="_blank"
          >
            <el-button class="to-shop" type="info">Go to shop</el-button>
          </a></el-descriptions-item
        >
      </el-descriptions>
    </template>
    <template v-else>
      <h4>Prices of this item are not available</h4>
    </template>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PricesEntity } from "@/types";

export default defineComponent({
  name: "ChocolateCard",
  props: {
    chocolate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      prices: [] as PricesEntity[],
      cheapestChocolate: {},
      averagePrice: 0,
      normalizedPrices: [] as PricesEntity[],
      normalizedPrice: {} as PricesEntity,
    };
  },
  created() {
    this.prices = this.chocolate.prices;
    this.normalizePrices();
    this.findCheapest();
    this.getAverage();
  },
  methods: {
    // normalize amount, unit and price
    normalizePrices(): PricesEntity[] {
      if (this.prices.length) {
        for (const price of this.prices) {
          this.normalizedPrice = Object.assign(
            {},
            {
              ...this.normalizedPrice,
              amount: price.unit === "kg" ? price.amount * 1000 : price.amount,
              price:
                price.unit === "kg"
                  ? price.price / ((price.amount * 1000) / 100)
                  : price.price / (price.amount / 100),
              shop: price.shop,
              link: price.link,
              unit: price.unit === "g" ? price.unit : "g",
            }
          );
          this.normalizedPrices.push(this.normalizedPrice);
        }
      }
      return this.normalizedPrices;
    },
    // find cheapest chocolate object
    findCheapest() {
      if (this.prices.length) {
        this.cheapestChocolate = this.normalizedPrices.reduce(function (
          res,
          obj
        ) {
          return obj.price < res.price ? obj : res;
        });
      }
    },
    // get average price
    getAverage() {
      let sum = 0;
      if (this.normalizedPrices.length) {
        for (const price of this.normalizedPrices) {
          sum += price.price;
        }
      }
      this.averagePrice = sum / this.normalizedPrices.length;
    },
  },
});
</script>

<style scoped>
.choco-link {
  text-decoration: none;
}
.box-card {
  margin-bottom: 30px;
  transition: all 150ms ease;
}

.box-card:hover {
  transform: scale(1.002);
  box-shadow: 0 6px 18px rgba(23, 64, 74, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h4 {
  color: #909399;
  margin: 5px 0;
}

.header-name {
  color: #00cbc4;
}

.pilot-button {
  background-color: #008c96;
  color: white;
  transition: all 150ms ease;
}

.pilot-button:hover {
  border-color: #008c96;
  color: #008c96;
}

.to-shop {
  margin: 0 auto;
}
</style>
