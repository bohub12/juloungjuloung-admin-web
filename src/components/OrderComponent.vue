<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h2>주문</h2>
  </div>
  <div>준비 중</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "OrderComponent",
  mounted() {
    this.$store.commit("menu/setMenu", "order");
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
