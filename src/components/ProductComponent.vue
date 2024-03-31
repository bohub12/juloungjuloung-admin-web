<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h2>상품</h2>
    <button
      type="button"
      class="btn btn-primary"
      @click="moveToSaveProductDetailComponent"
    >
      상품 추가하기
    </button>
  </div>

  <div class="row">
    <div class="col">
      <h4>Total Products</h4>
      <div>152</div>
    </div>
    <div class="col">
      <h4>Invisible Products</h4>
      <div>1</div>
    </div>
  </div>

  <div class="border-bottom mb-3 mt-3" />

  <div class="row">
    <div class="col-auto me-auto">
      카테고리 :
      <span class="dropdown">
        <button
          class="btn btn-primary btn-sm dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ getCurrentProductCategoryName() }}
        </button>
        <ul class="dropdown-menu">
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click="setProductCategory('BASE')"
              >All</a
            >
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li
            v-for="productCategory in productCategories"
            :key="productCategory.value"
          >
            <a
              class="dropdown-item"
              href="#"
              @click="setProductCategory(productCategory.value)"
              >{{ productCategory.name }}</a
            >
          </li>
        </ul>
      </span>
    </div>
    <div class="col-auto">이름 검색 바</div>
  </div>
  <div id="product-item-header-section" class="row border product-item-header">
    <div class="col">상품이름</div>
    <div class="vr no-padding"></div>
    <div class="col">노출여부</div>
    <div class="vr no-padding"></div>
    <div class="col">상품 타입</div>
    <div class="vr no-padding"></div>
    <div class="col">상품 코드</div>
    <div class="vr no-padding"></div>
    <div class="col">가격</div>
  </div>

  <div v-if="!products">Loading....</div>

  <div
    v-else
    v-for="product in products"
    :key="product.id"
    class="row border product-item"
    @click="goToProductDetails(product.id)"
  >
    <div class="col">{{ product.name }}</div>
    <div class="vr no-padding"></div>
    <template v-if="product.isDisplay === true">
      <DisplayOnComponent />
    </template>
    <template v-else>
      <DisplayOffComponent />
    </template>
    <div class="vr no-padding"></div>
    <div class="col">{{ getProductTypeName(product.productType) }}</div>
    <div class="vr no-padding"></div>
    <div class="col">{{ product.productCode }}</div>
    <div class="vr no-padding"></div>
    <div class="col">{{ product.price }}</div>
  </div>

  <nav aria-label="페이지 네비게이션">
    <ul class="pagination justify-content-center mt-4">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          href="#"
          @click="prevPage"
          tabindex="-1"
          aria-disabled="true"
          >이전</a
        >
      </li>

      <li
        v-for="pageNumber in totalPageCount"
        :key="pageNumber"
        class="page-item"
        :class="{ active: currentPage === pageNumber }"
      >
        <a class="page-link" href="#" @click="goToPage(pageNumber)">{{
          pageNumber
        }}</a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: currentPage === totalPageCount }"
      >
        <a class="page-link" href="#" @click="nextPage">다음</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { DefaultApiFactory } from "../apis";
import DisplayOffComponent from "@/components/product/DisplayOffComponent.vue";
import DisplayOnComponent from "@/components/product/DisplayOnComponent.vue";
import { resolveProductTypeName } from "@/utils/product/ProductTypeHandler";

const defaultApi = DefaultApiFactory();

export default defineComponent({
  name: "ProductComponent",
  data() {
    return {
      products: null,
      currentPage: 1,
      size: 10,
      totalPageCount: 1,
    };
  },
  mounted() {
    this.$store.commit("menu/setMenu", "product");
    this.getProductsFromServer(this.currentPage, this.size);
  },
  computed: {
    ...mapGetters({
      productCategories: "productCategory/productCategories",
      currentProductCategory: "productCategory/currentProductCategory",
    }),
  },
  methods: {
    getCurrentProductCategoryName() {
      const foundCategory = this.productCategories.find(
        (category) => category.value === this.currentProductCategory
      );
      return foundCategory ? foundCategory.name : "All";
    },

    getProductTypeName(productType) {
      return resolveProductTypeName(productType);
    },

    setProductCategory(newProductCategory) {
      this.$store.commit(
        "productCategory/setProductCategory",
        newProductCategory
      );
      this.currentPage = 1;
      this.getProductsFromServer(this.currentPage, this.size);
    },

    goToProductDetails(productId) {
      this.$router.push({
        name: "productDetail",
        params: { productId: productId },
      });
    },
    moveToSaveProductDetailComponent() {
      this.$router.push({
        name: "saveProductDetail",
      });
    },

    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      this.getProductsFromServer(this.currentPage, this.size);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.getProductsFromServer(this.currentPage, this.size);
    },
    nextPage() {
      if (this.currentPage < this.totalPageCount) {
        this.currentPage++;
      }
      this.getProductsFromServer(this.currentPage, this.size);
    },

    async getProductsFromServer(page, size) {
      try {
        const response = await defaultApi.readProducts(
          this.currentProductCategory,
          page - 1,
          size
        );
        this.products = response.data.data;
        this.totalPageCount = response.data.pageResponse.totalPageCount;
      } catch (error) {
        console.error("Error fetching products:", error);
        this.products = [];
        this.currentPage = 1;
        this.totalPageCount = 1;
      }
    },
  },
  components: {
    DisplayOffComponent,
    DisplayOnComponent,
  },
});
</script>

<style scoped>
.product-item-header {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity));
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.375rem;
}
#product-item-header-section {
  margin-right: 0rem;
  margin-left: 0rem;
}
.product-item {
  --bs-bg-opacity: 0.5;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0rem;
  margin-left: 0rem;
  border-radius: 0.375rem;
}
.no-padding {
  padding-left: 0;
  padding-right: 0;
}
</style>
