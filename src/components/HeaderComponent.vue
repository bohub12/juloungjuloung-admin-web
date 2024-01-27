<template>
  <header
    class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow"
    data-bs-theme="dark"
  >
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 p-3 fs-6 text-white">{{
      headerText
    }}</a>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderComponent",
  setup() {
    const headerText = "주렁주렁 어드민 페이지";
    return { headerText };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
