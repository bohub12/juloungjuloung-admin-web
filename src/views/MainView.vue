<template>
  <div>
    <HeaderComponent />
    <ThemeSwitchComponent />
    <div class="container-fluid">
      <div class="row">
        <SidebarComponent />
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <!-- <component :is="currentMenuComponent" /> -->
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
import ThemeSwitchComponent from "@/components/ThemeSwitchComponent.vue";
import DashboardComponent from "@/components/DashboardComponent.vue";
import ProductComponent from "@/components/ProductComponent.vue";
import OrderComponent from "@/components/OrderComponent.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainView",
  components: {
    HeaderComponent,
    SidebarComponent,
    ThemeSwitchComponent,
  },
  setup() {
    const store = useStore();

    const currentMenuComponent = computed(() => {
      const currentMenu = store.getters["menu/currentMenu"];
      switch (currentMenu) {
        case "dashboard":
          return DashboardComponent;
        case "product":
          return ProductComponent;
        case "order":
          return OrderComponent;
        default:
          return DashboardComponent;
      }
    });

    return {
      currentMenuComponent,
    };
  },
});
</script>
