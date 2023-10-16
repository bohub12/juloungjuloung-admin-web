<template>
  <HeaderComponent />
  <div class="container-fluid">
    <div class="row">
      <div
        class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary"
      >
        <div
          class="offcanvas-md offcanvas-end bg-body-tertiary"
          tabindex="-1"
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
        >
          <SidebarComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue"; // @ is an alias to /src
import SidebarComponent from "@/components/SidebarComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HeaderComponent,
    SidebarComponent,
  },
});
</script>
