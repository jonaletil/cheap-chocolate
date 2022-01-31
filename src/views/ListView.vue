<template>
  <el-main>
    <div class="list-view">
      <ChocolateCard
        v-for="choco in chocolates.data"
        :key="choco.id"
        :chocolate="choco"
      />
    </div>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { chocolateData } from "../../chocolate-data";

import ChocolateCard from "../components/ChocolateCard.vue";

// import ChocolateService from "../services/ChocolateService";
// import { ChocolateItems } from "@/types";

export default defineComponent({
  name: "ListView",
  components: {
    ChocolateCard,
  },
  data() {
    return {
      chocolates: chocolateData,
      // chocolates: [] as ChocolateItems[],
    };
  },
  // method for API calls - getChocolateData
  // created() {
  //   ChocolateService.getChocolateData()
  //     .then((response) => {
  //       this.chocolates = response.data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },
});
</script>

<style scoped>
.el-main {
  max-width: 1200px;
  margin: 100px auto 20px auto;
}
</style>
