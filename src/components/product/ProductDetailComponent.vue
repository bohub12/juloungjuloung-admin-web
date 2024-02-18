<template>
  <h1>상품디테일 컴포넌트 {{ id }}</h1>
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
  mounted() {
    this.$store.commit("menu/setMenu", "product");
  },
});
</script>
