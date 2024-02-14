import { createStore } from "vuex";
import theme from "./theme";
import menu from "./menu";
import productCategory from "./product/productCategory";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    theme,
    menu,
    productCategory,
  },
});
