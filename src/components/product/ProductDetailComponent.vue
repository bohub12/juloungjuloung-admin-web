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
          checked
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
        v-model="product.type"
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
        v-model="product.code"
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
      <label for="productWeight" class="form-label">상품 무게(g)</label>
      <input
        type="text"
        class="form-control"
        id="productWeight"
        v-model="product.weight"
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
      <div class="d-flex justify-content-between align-items-center">
        <div>상품 적용 가능한 색상별 추가금액(원)</div>
        <button class="btn btn-primary" @click="addColorOption">
          옵션 추가
        </button>
      </div>
      <div
        v-for="(color, index) in product.colors"
        :key="index"
        class="input-group mt-2"
      >
        <select class="form-select" aria-label="Default select example">
          <option value="1">ROSE_GOLD</option>
          <option value="2">WHITE_GOLD</option>
          <option value="3">GOLD</option>
        </select>

        <input
          type="number"
          class="form-control"
          v-model="color.additionalPrice"
          placeholder="추가 가격"
          required
        />
      </div>
    </div>

    <div class="mb-3">
      <div class="d-flex justify-content-between align-items-center">
        <div>상품 적용 가능한 재질별 추가 금액 (원)</div>
        <button class="btn btn-primary" @click="addMaterialOption">
          옵션 추가
        </button>
      </div>
      <div
        v-for="(material, index) in product.materials"
        :key="index"
        class="input-group mt-2"
      >
        <input
          type="text"
          class="form-control"
          v-model="material.material"
          placeholder="재질"
          required
        />
        <input
          type="number"
          class="form-control"
          v-model="material.additionalPrice"
          placeholder="추가 가격"
          required
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductDetailComponent",
  props: {
    id: {
      type: BigInt,
    },
  },
  data() {
    return {
      mode: "view", // 'view' or 'create' or 'edit'
      product: {
        name: "주렁주렁 스탠다드 목걸이",
        isDisplay: false,
        code: "ABC",
        type: "BRACELET",
        price: "150000",
        weight: 10,
        isDiamond: false,
        images: [
          {
            imageUrl: "https://picsum.photos/200/200",
            isThumnail: true,
          },
          {
            imageUrl: "https://picsum.photos/200/300",
            isThumnail: false,
          },
        ],
        colors: [
          {
            color: "ROSE_GOLD",
            additionalPrice: 0,
          },
          {
            color: "GOLD",
            additionalPrice: 1000,
          },
        ],
        materials: [
          {
            material: "14K",
            additionalPrice: 0,
          },
          {
            material: "18K",
            additionalPrice: 1000,
          },
          {
            material: "24K",
            additionalPrice: 2000,
          },
        ],
      },
    };
  },
  mounted() {
    this.$store.commit("menu/setMenu", "product");
  },
  methods: {
    handleSubmit() {
      // Handle form submission (e.g., sending data to server)
      console.log("Form submitted", this.product);
    },
    handleImageChange(event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.product.images = Array.from(files);
      }
    },

    addColorOption() {
      this.product.colors.push({ color: "", additionalPrice: 0 });
    },

    addMaterialOption() {
      this.product.materials.push({ material: "", additionalPrice: 0 });
    },
    removeColorOption(index) {
      this.product.colors.splice(index, 1);
    },
    removeMaterialOption(index) {
      this.product.materials.splice(index, 1);
    },
  },
});
</script>
