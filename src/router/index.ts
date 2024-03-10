import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainView from "../views/MainView.vue";
import DashboardComponent from "@/components/DashboardComponent.vue";
import ProductComponent from "@/components/ProductComponent.vue";
import ProductDetailComponent from "@/components/product/ProductDetailComponent.vue";
import OrderComponent from "@/components/OrderComponent.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    redirect: "/dashboard",
    component: MainView,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "/product",
        name: "product",
        component: ProductComponent,
      },
      {
        path: "/product/:productId",
        name: "productDetail",
        component: ProductDetailComponent,
        props: true,
      },
      {
        path: "/order",
        name: "order",
        component: OrderComponent,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
