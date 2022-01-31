import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ListView from "../views/ListView.vue";
import DetailView from "../views/DetailView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "ListView",
    component: ListView,
  },
  {
    path: "/detail/:id",
    name: "DetailView",
    props: true,
    component: DetailView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
