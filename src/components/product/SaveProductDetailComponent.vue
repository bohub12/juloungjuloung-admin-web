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
        <div class="d-flex justify-content-between align-items-center">
          <div>상품 이미지</div>
          <label for="file-upload" class="custom-file-upload bg-primary badge">
            <!-- <span class="fs-2"> -->
            <i
              class="bi bi-cloud-arrow-up-fill"
              style="padding-right: 0.25rem"
            ></i>
            <!-- </span> -->
            <span>상품 이미지 업로드</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".jpg, .jpeg, .png"
            @change="imageFileUploadToS3"
          />
        </div>
        <ul class="list-group list-group-horizontal overflow-auto">
          <img
            v-for="image in this.productImages
              .upsertProductImageInternalRequests"
            :key="image.imageUrl"
            :src="image.imageUrl"
            width="200"
            height="200"
            class="rounded ml-1"
          />
        </ul>
      </div>

      <div class="border-bottom mb-3 mt-3" />
      <div class="d-flex justify-content-between mb-3">
        <h2>Product Options</h2>
        <button
          type="button"
          class="btn btn-primary"
          @click="addOptionCategory"
        >
          옵션 카테고리 추가
        </button>
      </div>

      <div
        class="mb-3"
        v-for="(optionInfo, optionCategoryIndex) in this.productOptionInfos"
        :key="optionCategoryIndex"
      >
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            v-model="optionInfo.optionCategory.name"
            placeholder="ex) 재질, 호수..."
            required
          />
          <button
            class="btn btn-danger"
            @click="removeOptionCategory(optionCategoryIndex)"
          >
            삭제
          </button>
          <button
            class="btn btn-primary"
            @click="addOption(optionCategoryIndex)"
          >
            하위에 옵션 추가
          </button>
        </div>

        <div
          v-for="(option, optionIndex) in optionInfo.options"
          :key="optionIndex"
          class="input-group mt-2 ps-5"
        >
          <input
            type="text"
            class="form-control"
            v-model="option.name"
            placeholder="ex) 14호, 16호, 로즈골드, 화이트골드 ..."
            required
          />
          <input
            type="number"
            class="form-control"
            v-model="option.additionalPrice"
            placeholder="옵션별 추가 가격"
            required
          />
          <button
            class="btn btn-danger"
            @click="removeOption(optionCategoryIndex, optionIndex)"
          >
            삭제
          </button>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import axios from "axios";
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
      savedProductId: 0 as number,
      availableProductTypes: [
        SaveProductRequestProductTypeEnum.Bracelet,
        SaveProductRequestProductTypeEnum.Earring,
        SaveProductRequestProductTypeEnum.Necklace,
        SaveProductRequestProductTypeEnum.Ring,
      ] as Array<SaveProductRequestProductTypeEnum>,
      product: {} as SaveProductRequest,
      productImages: {} as UpsertProductImageRequest,
      productImageFiles: [] as Array<File>,
      productOptionInfos: [] as Array<UpsertProductOptionRequest>,
    };
  },
  mounted() {
    const store = useStore();
    store.commit("menu/setMenu", "product");
  },
  methods: {
    handleSubmit() {
      this.saveProduct();

      this.productImages.productId = this.savedProductId;
      this.productOptionInfos.forEach((value) => {
        value.productId = this.savedProductId;
      });

      this.saveProductImages();
      this.saveProductOptionInfos();
    },
    async saveProduct() {
      defaultApi
        .saveProduct(this.product)
        .then((res) => {
          this.savedProductId = res.data.data!;
        })
        .catch((error) => console.error(error));
    },
    async saveProductImages() {
      for (const productImageFile of this.productImageFiles) {
        this.saveProductImage(productImageFile);
      }
    },
    async saveProductImage(imageFile: File) {
      // save product image info to my server
    },
    async imageFileUploadToS3(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        const file = input.files[0];
        const resposne = await defaultApi.createPreSignedUrl();

        const preSignedUrl = resposne.data.data!.preSignedUrl;
        const virtualImagePath = resposne.data.data!.virtualImagePath;

        await this.uploadImageToS3(preSignedUrl, file);

        if (!this.productImages.upsertProductImageInternalRequests) {
          this.productImages.upsertProductImageInternalRequests = [
            {
              id: 0,
              imageUrl: virtualImagePath,
              isThumbnail: false,
            },
          ];
        } else {
          this.productImages.upsertProductImageInternalRequests.push({
            id: 0,
            imageUrl: virtualImagePath,
            isThumbnail: false,
          });
        }

        console.log(virtualImagePath);
      }
    },
    async uploadImageToS3(preSignedUrl: string, imageFile: File) {
      await axios
        .put(preSignedUrl, imageFile, {
          headers: {
            "Content-Type": "image/jpg",
          },
        })
        .then((res) => console.log(res))
        .catch((error) => console.error(error));
    },

    async saveProductOptionInfos() {
      // save product option infos

      console.log("save product option infos");
    },

    addOptionCategory() {
      this.productOptionInfos.push({
        productId: 0,
        optionCategory: { id: 0, name: "" },
        options: [],
      });
    },
    removeOptionCategory(optionCategoryIndex: number) {
      this.productOptionInfos.splice(optionCategoryIndex, 1);
    },
    addOption(optionCategoryIndex: number) {
      this.productOptionInfos[optionCategoryIndex].options.push({
        id: 0,
        name: "",
        additionalPrice: 0,
      });
    },
    removeOption(optionCategoryIndex: number, optionIndex: number) {
      this.productOptionInfos[optionCategoryIndex].options.splice(
        optionIndex,
        1
      );
    },
  },
});
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border-radius: 0.5rem;
  display: inline-block;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
}
/* 
.custom-file-upload span {
  display: block;
  text-align: center;
} */
</style>
