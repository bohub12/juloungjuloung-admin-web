<template>
  <div class="container mt-5">
    <h1 class="mb-3">Product Detail</h1>
    <div class="mb-3">
      <label for="productName" class="form-label">상품 이름</label>
      <input
        type="text"
        class="form-control"
        id="productName"
        v-model="product.name"
        required
        readonly
      />
    </div>
    <div class="mb-3">
      <div>상품 전시여부</div>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          :checked="product.isDisplay"
          :unchecked="!product.isDisplay"
          disabled
        />
      </div>
    </div>

    <div class="mb-3">
      <label for="productType" class="form-label">상품 타입</label>
      <input
        type="text"
        class="form-control"
        id="productType"
        v-model="product.productType"
        disabled
        readonly
      />
    </div>

    <div class="mb-3">
      <label for="productCode" class="form-label">상품 코드</label>
      <input
        type="text"
        class="form-control"
        id="productCode"
        v-model="product.productCode"
        disabled
        readonly
      />
    </div>

    <div class="mb-3">
      <label for="productPrice" class="form-label">상품 가격(원)</label>
      <input
        type="text"
        class="form-control"
        id="productPrice"
        v-model="product.price"
        required
        readonly
      />
    </div>
    <div class="mb-3">
      <label for="productWeight" class="form-label">상품 무게(mg)</label>
      <input
        type="text"
        class="form-control"
        id="productWeight"
        v-model="product.weightByMilliGram"
        required
        readonly
      />
    </div>

    <div class="mb-3">
      <div class="mt-3">상품 이미지</div>
      <ul class="list-group list-group-horizontal">
        <img
          v-for="image in product.images"
          :key="image.imageUrl"
          :src="image.imageUrl"
          width="200"
          height="200"
          class="rounded ml-1"
        />
      </ul>
    </div>

    <div class="border-bottom mb-3 mt-3" />
    <h2 class="mb-3">Product Options</h2>

    <div class="mb-3">
      <div
        v-for="(productOptionInfo, index) in productOptionInfos"
        :key="index"
        class="mb-3"
      >
        <div class="d-flex justify-content-between align-items-center">
          <div>{{ productOptionInfo.optionCategory.name }}</div>
        </div>
        <div
          v-for="(option, index) in productOptionInfo.options"
          :key="index"
          class="input-group mt-2"
        >
          <input
            type="text"
            class="form-control"
            v-model="option.name"
            placeholder="옵션 이름"
            readonly
          />
          <input
            type="number"
            class="form-control"
            v-model="option.additionalPrice"
            placeholder="추가 가격"
            readonly
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import {
  DefaultApiFactory,
  ProductResponse,
  ProductOptionInfoResponse,
} from "../../apis";

const defaultApi = DefaultApiFactory();

export default defineComponent({
  name: "ProductDetailComponent",
  props: {
    productId: {
      type: Number,
    },
  },
  data() {
    return {
      product: {} as ProductResponse,
      productOptionInfos: [] as Array<ProductOptionInfoResponse>,
    };
  },
  mounted() {
    const store = useStore();
    store.commit("menu/setMenu", "product");
    this.getProductDetailFromServer(this.productId as number);
  },
  methods: {
    async getProductDetailFromServer(productId: number) {
      try {
        const response = await defaultApi.readProductDetail(productId);
        this.product = response.data.data?.product ?? ({} as ProductResponse);
        this.productOptionInfos =
          response.data.data?.productOptionInfos ??
          ([] as Array<ProductOptionInfoResponse>);
      } catch (error) {
        console.error("Error fetching product detail:", error);
        this.product = {} as ProductResponse;
      }
    },
  },
});
</script>
