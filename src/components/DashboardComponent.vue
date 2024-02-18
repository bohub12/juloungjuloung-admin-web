<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h2>대시보드</h2>
  </div>
  <div>준비 중</div>

  <h2 v-for="dashBoardItem in dashBoardItems" :key="dashBoardItem">
    {{ dashBoardItem }}
  </h2>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DashboardComponent",
  setup() {
    const dashBoardItems = ["오늘 방문 수", "이번 달 방문 수"];
    return { dashBoardItems };
  },
  mounted() {
    this.$store.commit("menu/setMenu", "dashboard");
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
