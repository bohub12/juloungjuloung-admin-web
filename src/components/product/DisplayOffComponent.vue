<template>
  <div class="col">
    <span class="badge bg-danger product-activation-badge text-danger"
      ><i
        class="bi bi-exclamation-triangle-fill"
        style="padding-right: 0.25rem"
      ></i
      >미노출</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DisplayOffComponent",
});
</script>

<style scoped>
.product-activation-badge {
  --bs-bg-opacity: 0.3;
}
</style>
