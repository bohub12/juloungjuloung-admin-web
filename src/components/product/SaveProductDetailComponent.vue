<template>
  <div class="container mt-5">
    <h1 class="mb-3">Save Product Detail</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="productName" class="form-label">상품 이름</label>
        <input
          type="text"
          class="form-control"
          id="productName"
          v-model="product.name"
          required
        />
      </div>

      <div class="mb-3">
        <label for="productType" class="form-label">상품 타입</label>
        <!-- <input
          type="text"
          class="form-control"
          id="productType"
          v-model="product.productType"
        /> -->
        <select
          class="form-select"
          id="productType"
          aria-label="Default select example"
          v-model="product.productType"
        >
          <option
            v-for="productType in availableProductTypes"
            :key="productType"
          >
            {{ productType }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="productPrice" class="form-label">상품 가격(원)</label>
        <input
          type="number"
          class="form-control"
          id="productPrice"
          v-model="product.price"
          required
        />
      </div>
      <div class="mb-3">
        <label for="productWeight" class="form-label">상품 무게(mg)</label>
        <input
          type="number"
          class="form-control"
          id="productWeight"
          v-model="product.weightByMilliGram"
          required
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

      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import {
  DefaultApiFactory,
  SaveProductRequest,
  SaveProductRequestProductTypeEnum,
  UpsertProductImageRequest,
  UpsertProductOptionRequest,
} from "../../apis";

const defaultApi = DefaultApiFactory();

export default defineComponent({
  name: "SaveProductDetailComponent",
  data() {
    return {
      availableProductTypes: [
        SaveProductRequestProductTypeEnum.Bracelet,
        SaveProductRequestProductTypeEnum.Earring,
        SaveProductRequestProductTypeEnum.Necklace,
        SaveProductRequestProductTypeEnum.Ring,
      ] as Array<SaveProductRequestProductTypeEnum>,
      product: {} as SaveProductRequest,
      productImages: {} as UpsertProductImageRequest,
      productOptionInfos: {} as UpsertProductOptionRequest,
    };
  },
  mounted() {
    const store = useStore();
    store.commit("menu/setMenu", "product");
  },
  methods: {
    handleSubmit() {
      this.saveProduct();
      console.log("Form Saved");
    },

    async saveProduct() {
      const response = defaultApi.saveProduct(this.product);
    },
  },
});
</script>
