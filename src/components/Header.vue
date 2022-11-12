<template>
  <el-header class="header"
    ><router-link :to="{ name: 'ListView' }"
      ><span>Cheap Chocolate</span></router-link>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>

<style scoped>
.header {
  text-align: center;
  padding: 20px;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: auto;
  z-index: 9;
  width: 100%;
  box-shadow: 0 6px 40px rgba(23, 64, 74, 0.1);
  background-color: white;
}

a {
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
    color: black;
}
</style>
