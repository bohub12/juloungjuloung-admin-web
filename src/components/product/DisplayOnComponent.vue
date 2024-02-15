<template>
  <div class="col">
    <span class="badge bg-success product-activation-badge text-success"
      ><i class="bi bi-check-circle-fill" style="padding-right: 0.25rem"></i
      >노출중</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DisplayOnComponent",
});
</script>

<style scoped>
.product-activation-badge {
  --bs-bg-opacity: 0.3;
}
</style>
