import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/coin/:id",
      name: "singleAsset",
      component: () => import("../views/SingleAssetView.vue"),
    },
    {
      path: "/exchanges",
      name: "exchanges",
      component: () => import("../views/ExchangesView.vue"),
    },
    {
      path: "/search/:search",
      name: "searchAsset",
      component: () => import("../views/SearchAssetView.vue"),
    },
  ],
});

export default router;
