import { Component } from "vue";
import DashboardComponent from "../components/DashboardComponent.vue";
import ProductComponent from "../components/ProductComponent.vue";
import OrderComponent from "../components/OrderComponent.vue";

interface Menu {
  name: string;
  unSelectedBootstrapIconClass: string;
  selectedBootstrapIconClass: string;
  component: Component;
  value: string;
}

interface MenuState {
  menus: Menu[];
  currentMenu: string;
}

export default {
  namespaced: true,
  state: {
    menus: [
      {
        name: "대시보드",
        unSelectedBootstrapIconClass: "bi bi-house",
        selectedBootstrapIconClass: "bi bi-house-fill",
        component: DashboardComponent,
        value: "dashboard",
      },
      {
        name: "상품",
        unSelectedBootstrapIconClass: "bi bi-cart",
        selectedBootstrapIconClass: "bi bi-cart-fill",
        component: ProductComponent,
        value: "product",
      },
      {
        name: "주문",
        unSelectedBootstrapIconClass: "bi bi-file-earmark-medical",
        selectedBootstrapIconClass: "bi bi-file-earmark-medical-fill",
        component: OrderComponent,
        value: "order",
      },
    ],
    currentMenu: "dashboard",
  },
  mutations: {
    setMenu(state: MenuState, newMenu: string) {
      state.currentMenu = newMenu;
    },
  },
  actions: {
    // 다른 액션들을 추가할 수 있음
  },
  getters: {
    menus: (state: MenuState) => state.menus,
    currentMenu: (state: MenuState) => state.currentMenu,
  },
};
