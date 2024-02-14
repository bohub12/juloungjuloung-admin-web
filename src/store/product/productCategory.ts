interface ProductCategory {
  name: string;
  value: string;
}

interface ProductCategoryState {
  productCategories: ProductCategory[];
  currentProductCategory: string;
}

export default {
  namespaced: true,
  state: {
    productCategories: [
      { name: "반지", value: "RING" },
      { name: "목걸이", value: "NECKLACE" },
      { name: "귀걸이", value: "EARRING" },
      { name: "팔찌", value: "BRACELET" },
    ],
    currentProductCategory: null,
  },
  mutations: {
    setProductCategory(
      state: ProductCategoryState,
      newProductCategory: string
    ) {
      state.currentProductCategory = newProductCategory;
    },
  },
  actions: {
    // 다른 액션들을 추가할 수 있음
  },
  getters: {
    productCategories: (state: ProductCategoryState) => state.productCategories,
    currentProductCategory: (state: ProductCategoryState) =>
      state.currentProductCategory,
  },
};
