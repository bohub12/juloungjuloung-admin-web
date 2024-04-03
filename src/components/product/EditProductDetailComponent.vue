<template>
  <div class="container mt-5">
    <h1 class="mb-3">Edit Product Detail</h1>
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
        <div>상품 전시여부</div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            v-model="product.isDisplay"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            :checked="product.isDisplay"
            :unchecked="!product.isDisplay"
          />
        </div>
      </div>

      <div class="mb-3">
        <label for="productType" class="form-label">상품 타입</label>
        <select
          class="form-select"
          id="productType"
          v-model="product.productType"
          disabled
        >
          <option
            v-for="productType in availableProductTypes"
            :key="productType.value"
            :value="productType.value"
            :selected="product.productType == productType.value"
          >
            {{ productType.name }}
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
            <i
              class="bi bi-cloud-arrow-up-fill"
              style="padding-right: 0.25rem"
            ></i>
            <span>상품 이미지 업로드</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".jpg, .jpeg, .png"
            @change="imageFileUpload"
          />
        </div>
        <ul class="list-group list-group-horizontal overflow-auto">
          <div
            v-for="(image, index) in this.productImages
              .upsertProductImageInternalRequests"
            :key="index"
            class="product-image"
          >
            <img
              :src="image.imageUrl"
              width="200"
              height="200"
              :class="[
                'rounded',
                'me-1',
                image.isThumbnail
                  ? 'border border-3 border-success border-opacity-75'
                  : '',
              ]"
              @click="changeThumnailImage(index)"
            />
            <span
              v-if="image.isThumbnail"
              class="product-image-thumnail-badge badge bg-success text-white"
            >
              대표 이미지</span
            >
          </div>
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

      <button type="submit" class="btn btn-primary">저장하기</button>
    </form>
  </div>
</template>

<script lang="ts">
import {
  DefaultApiFactory,
  ProductImageResponse,
  ProductOptionInfoResponse,
  ProductResponse,
  UpdateProductRequest,
  UpsertProductImageRequest,
  UpsertProductOptionInternalRequest,
  UpsertProductOptionRequest,
} from "@/apis";
import { resolveProductTypeToUpdateProductTypeEnum } from "@/utils/product/ProductTypeHandler";
import { defineComponent } from "vue";
import { useStore, mapGetters } from "vuex";
import axios, { AxiosError } from "axios";

const defaultApi = DefaultApiFactory();

export default defineComponent({
  name: "EditProductDetailComponent",
  props: {
    productId: {
      type: Number,
    },
  },
  data() {
    return {
      product: {} as UpdateProductRequest,
      productImages: {} as UpsertProductImageRequest,
      productImageFiles: [] as Array<File>,
      productOptionInfos: [] as Array<UpsertProductOptionRequest>,
    };
  },
  mounted() {
    console.log("mounted");
    const store = useStore();
    store.commit("menu/setMenu", "product");

    this.product.id = this.productId!;
    this.getProductDetailInfosFromServer();
  },
  computed: {
    ...mapGetters({
      availableProductTypes: "productCategory/productCategories",
    }),
  },
  methods: {
    async getProductDetailInfosFromServer() {
      const productId = this.productId as number;
      try {
        const response = await defaultApi.readProductDetail(productId);
        const productResponse =
          response.data.data?.product ?? ({} as ProductResponse);
        const productOptionInfosResponse =
          response.data.data?.productOptionInfos ??
          ([] as Array<ProductOptionInfoResponse>);

        this.convertProductResponse(productResponse);
        this.convertProductOptionInfosResponse(productOptionInfosResponse);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }

      try {
        const response = await defaultApi.readProductImages(productId);
        const productImagesResponse =
          response.data.data ?? ([] as Array<ProductImageResponse>);

        this.convertProductImagesResponse(productImagesResponse);
      } catch (error) {
        console.error("Error fetching product image detail:", error);
      }
    },
    convertProductResponse(productResponse: ProductResponse) {
      this.product.productType = resolveProductTypeToUpdateProductTypeEnum(
        productResponse.productType
      );
      this.product.name = productResponse.name;
      this.product.price = productResponse.price;
      this.product.weightByMilliGram = productResponse.weightByMilliGram;
      this.product.isDiamond = productResponse.isDiamond;
      this.product.totalDiamondCaratX100 =
        productResponse.totalDiamondCaratX100;
      this.product.isDisplay = productResponse.isDisplay;
    },
    convertProductOptionInfosResponse(
      productOptionInfosResponse: Array<ProductOptionInfoResponse>
    ) {
      this.productOptionInfos = new Array<UpsertProductOptionRequest>();

      for (const productOptionInfoResponse of productOptionInfosResponse) {
        const upsertProductOptionRequest: UpsertProductOptionRequest = {
          productId: productOptionInfoResponse.optionCategory.productId,
          optionCategory: {
            id: productOptionInfoResponse.optionCategory.id,
            name: productOptionInfoResponse.optionCategory.name,
          },
          options: [],
        };

        for (const productOptionResponse of productOptionInfoResponse.options) {
          const upsertProductOptionInternalRequest: UpsertProductOptionInternalRequest =
            {
              id: productOptionResponse.id,
              name: productOptionResponse.name,
              additionalPrice: productOptionResponse.additionalPrice,
            };
          upsertProductOptionRequest.options.push(
            upsertProductOptionInternalRequest
          );
        }

        this.productOptionInfos.push(upsertProductOptionRequest);
      }
    },
    convertProductImagesResponse(
      productImagesResponse: Array<ProductImageResponse>
    ) {
      this.productImages.productId = this.productId!;
      this.productImages.upsertProductImageInternalRequests = [];

      for (const productImageResponse of productImagesResponse) {
        this.productImages.upsertProductImageInternalRequests.push({
          id: productImageResponse.id,
          imageUrl: productImageResponse.imageUrl,
          isThumbnail: productImageResponse.isThumbnail,
        });
      }
    },
    async handleSubmit() {
      const result = confirm("수정하시겠습니까?");
      if (!result) {
        return;
      }

      try {
        await this.updateApiCalls();
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response!.data.message);
          return;
        }
        alert(
          "상품 수정 중에 문제가 있었습니다. 개발팀으로 문의주시기 바랍니다."
        );
        return;
      }

      // routing to product page
      this.$router.push({
        name: "product",
      });
    },
    async updateApiCalls() {
      // update product images
      const imageResponse = await defaultApi.upsertProductImages(
        this.productImages
      );

      // update product image request
      await this.updateProductImageRequest();

      // update product options
      for (const productOptionInfo of this.productOptionInfos) {
        await defaultApi.upsertProductOptions(productOptionInfo);
      }

      // update product option request
      await this.updateProductOptionRequest();

      // update product
      await defaultApi.updateProduct(this.product);
    },
    async updateProductOptionRequest() {
      const productId = this.productId as number;
      const response = await defaultApi.readProductDetail(productId);
      const productOptionInfosResponse =
        response.data.data?.productOptionInfos ??
        ([] as Array<ProductOptionInfoResponse>);

      this.convertProductOptionInfosResponse(productOptionInfosResponse);
    },
    async updateProductImageRequest() {
      const productId = this.productId as number;
      const response = await defaultApi.readProductImages(productId);
      const productImagesResponse =
        response.data.data ?? ([] as Array<ProductImageResponse>);

      this.convertProductImagesResponse(productImagesResponse);
    },
    async imageFileUpload(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        const file = input.files[0];
        const resposne = await defaultApi.createPreSignedUrl();

        // eslint-disable-next-line
        const preSignedUrl = resposne.data.data!.preSignedUrl;
        // eslint-disable-next-line
        const virtualImagePath = resposne.data.data!.virtualImagePath;

        await this.uploadImageToS3(preSignedUrl, file);

        if (
          !this.productImages.upsertProductImageInternalRequests ||
          this.productImages.upsertProductImageInternalRequests.length == 0
        ) {
          this.productImages.upsertProductImageInternalRequests = [
            {
              id: 0,
              imageUrl: virtualImagePath,
              isThumbnail: true,
            },
          ];
        } else {
          this.productImages.upsertProductImageInternalRequests.push({
            id: 0,
            imageUrl: virtualImagePath,
            isThumbnail: false,
          });
        }
      }
    },
    async uploadImageToS3(preSignedUrl: string, imageFile: File) {
      // TODO : 이미지 파일 확장자에 맞게끔 수정할지 결정 (서버도 같이 수정)
      await axios
        .put(preSignedUrl, imageFile, {
          headers: {
            "Content-Type": "image/jpg",
          },
        })
        .catch((error) => console.error(error));
    },
    async saveProductOptionInfos() {
      try {
        this.productOptionInfos.forEach(async function (productOptionInfo) {
          const resposne = await defaultApi.upsertProductOptions(
            productOptionInfo
          );

          if (resposne.data.code != 200) {
            console.error("fail to saving product option");
          }
        });
      } catch (error) {
        console.error(error);
      }
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
    changeThumnailImage(productThumbnailImageIndex: number) {
      this.productImages.upsertProductImageInternalRequests.forEach(
        (request, index) => {
          if (index == productThumbnailImageIndex) {
            request.isThumbnail = true;
          } else {
            request.isThumbnail = false;
          }
        }
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
.product-image {
  position: relative;
  cursor: pointer;
}
.product-image-thumnail-badge {
  position: absolute;
  top: 10%;
  left: 75%;
  transform: translate(-50%, -50%);
  --bs-bg-opacity: 0.75;
}
</style>
