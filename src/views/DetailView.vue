<template>
  <el-main>
    <router-link class="back-to-list" :to="{ name: 'ListView' }">
      <el-button class="pilot-button">
        <el-icon class="el-icon--left">
          <ArrowLeft />
        </el-icon>
        Back to List view
      </el-button>
    </router-link>
    <div class="detail-view">
      <div class="chocolate-info">
        <h1 contenteditable>{{ choco.name }}</h1>
        <span contenteditable>{{ choco.brand }}</span>
      </div>
      <el-table :data="choco.prices" border style="width: 100%">
        <el-table-column label="Price">
          <template #default="scope"
            ><span :class="scope.row.link === cheapest ? 'is-cheapest' : ''"
              >{{ scope.row.price + "€"
              }}<span class="info-text" v-if="scope.row.link === cheapest"
                >(Best price per 100g)</span
              >
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="shop" label="Shop" />
        <el-table-column prop="link" label="Link to Shop">
          <template #default="scope">
            <a class="visit-shop" :href="scope.row.link" target="_blank">
              <el-button class="pilot-button">Visit Online Shop</el-button>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="unit" />
        <el-table-column prop="amount" label="amount" />
      </el-table>
      <div class="nutritional-info">
        <h3>Nutritional Values:</h3>
        <PieChart :chartData="nutritionData" />
      </div>
    </div>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { PieChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// import axios from "axios";
// import ChocolateService from "../services/ChocolateService";
// import { DataEntity } from "@/types";

export default defineComponent({
  props: [
    "id",
    "name",
    "brand",
    "chocolate",
    "cheapest",
    "prices",
    "fat",
    "carbohydrates",
    "protein",
    "salt",
  ],
  components: { PieChart, ArrowLeft },
  data() {
    return {
      choco: JSON.parse(this.chocolate),
      nutritionData: {
        labels: ["Fat", "Carbohydrates", "Protein", "Salt"],
        datasets: [
          {
            data: [
              parseInt(this.fat),
              parseInt(this.carbohydrates),
              parseInt(this.protein),
              parseInt(this.salt),
            ],
            backgroundColor: ["#FECD42", "#02B6C4", "#FF534C", "#d2ccc0"],
          },
        ],
      },
      // chocolate: {} as DataEntity,
    };
  },
  created() {
    // method for API calls - getChocolateItem
    // ChocolateService.getChocolateItem(this.id, this.name)
    //   .then((response) => {
    //     this.chocolate = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },
  methods: {
    // POST Method for name and brand changes
    // postMethod() {
    //   axios
    //     .post("https://some-url", "name or brand")
    //     .then(function (response) {
    //       console.log("Response", response);
    //     })
    //     .catch(function (err) {
    //       console.log("Error", err);
    //     });
    // },
  },
});
</script>

<style scoped>
.el-main {
  max-width: 1200px;
  margin: 100px auto 20px auto;
}

.chocolate-info {
  text-align: center;
  margin-bottom: 30px;
}

.nutritional-info {
  text-align: center;
  margin: 40px 0;
}

.back-to-list,
.visit-shop {
  text-decoration: none;
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

.is-cheapest {
  font-weight: bold;
  color: #00cbc4;
}

.info-text {
  margin-left: 5px;
}
</style>
