<template>
  <HeaderComponent />
  <ThemeSwitchComponent />
  <div class="container-fluid">
    <div class="row">
      <SidebarComponent />
      <DashboardComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue"; // @ is an alias to /src
import SidebarComponent from "@/components/SidebarComponent.vue";
import DashboardComponent from "@/components/DashboardComponent.vue";
import ThemeSwitchComponent from "@/components/ThemeSwitchComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    ThemeSwitchComponent,
  },
});
</script>
