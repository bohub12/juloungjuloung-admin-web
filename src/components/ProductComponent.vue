<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h2>상품</h2>
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

  <!-- 예시 상품 데이터 -->
  <div class="row border product-item">
    <div class="col">상품1</div>
    <div class="vr no-padding"></div>
    <div class="col">
      <span class="badge bg-danger product-activation-badge text-danger"
        ><i
          class="bi bi-exclamation-triangle-fill"
          style="padding-right: 0.25rem"
        ></i
        >미노출</span
      >
    </div>
    <div class="vr no-padding"></div>
    <div class="col">전자제품</div>
    <div class="vr no-padding"></div>
    <div class="col">P12345</div>
    <div class="vr no-padding"></div>
    <div class="col">₩1,000,000</div>
  </div>

  <div class="row border product-item">
    <div class="col">상품2</div>
    <div class="vr no-padding"></div>
    <div class="col">
      <span class="badge bg-success product-activation-badge text-success"
        ><i class="bi bi-check-circle-fill" style="padding-right: 0.25rem"></i
        >노출중</span
      >
    </div>
    <div class="vr no-padding"></div>
    <div class="col">의류</div>
    <div class="vr no-padding"></div>
    <div class="col">C98765</div>
    <div class="vr no-padding"></div>
    <div class="col">₩50,000</div>
  </div>

  <div v-if="!products">Loading....</div>

  <div
    v-else
    v-for="product in products"
    :key="product.id"
    class="row border product-item"
  >
    <div class="col">{{ product.name }}</div>
    <div class="vr no-padding"></div>
    <div class="col">
      <span class="badge bg-success product-activation-badge text-success"
        ><i class="bi bi-check-circle-fill" style="padding-right: 0.25rem"></i
        >노출중</span
      >
    </div>
    <div class="vr no-padding"></div>
    <div class="col">{{ product.productType }}</div>
    <div class="vr no-padding"></div>
    <div class="col">{{ product.productCode }}</div>
    <div class="vr no-padding"></div>
    <div class="col">{{ product.price }}</div>
  </div>

  <nav aria-label="페이지 네비게이션">
    <ul class="pagination justify-content-center mt-4">
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
          >이전</a
        >
      </li>
      <li class="page-item active" aria-current="page">
        <a class="page-link" href="#"
          >1 <span class="visually-hidden">(현재)</span></a
        >
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">3</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">다음</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { DefaultApiFactory } from "../apis";

const defaultApi = DefaultApiFactory();

export default defineComponent({
  name: "ProductComponent",
  data() {
    return {
      products: null,
      page: 0,
      size: 10,
    };
  },
  mounted() {
    this.fetchProducts(this.page, this.size);
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

    setProductCategory(newProductCategory) {
      this.$store.commit(
        "productCategory/setProductCategory",
        newProductCategory
      );
    },

    async fetchProducts(page, size) {
      try {
        const response = await defaultApi.readProducts(
          this.currentProductCategory,
          page,
          size
        );
        this.products = response.data.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        this.products = [];
      }
    },
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
.product-activation-badge {
  --bs-bg-opacity: 0.3;
}
.no-padding {
  padding-left: 0;
  padding-right: 0;
}
</style>
