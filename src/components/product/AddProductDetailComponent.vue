<template>
  <div class="container mt-5">
    <h2>Add Product</h2>
    <form @submit.prevent="handleSubmit">
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
        <!-- <label class="form-check-label" for="flexSwitchCheckChecked"
          >상품 전시여부
        </label> -->
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
        <div>상품 색상</div>
        <ul class="list-group list-group-horizontal">
          <li
            v-for="color in product.colors"
            :key="color.color"
            class="list-group-item"
          >
            {{ color.color }} (+{{ color.additionalPrice }}원)
          </li>
        </ul>
      </div>

      <div class="mb-3">
        <div>상품 재질</div>
        <ul class="list-group list-group-horizontal">
          <li
            v-for="material in product.materials"
            :key="material.material"
            class="list-group-item"
          >
            {{ material.material }} (+{{ material.additionalPrice }}원)
          </li>
        </ul>
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

      <button v-if="mode !== 'view'" type="submit" class="btn btn-primary">
        {{ mode === "create" ? "Add Product" : "Save Changes" }}
      </button>
    </form>
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
  },
});
</script>
