<script setup lang="ts">
import Header from "@/components/Interface/Header/HeaderComponent.vue";
import Sidebar from "@/components/Interface/Sidebar/SidebarComponent.vue";
</script>

<template>
  <div class="view">
    <Header />
    <Sidebar />
    <RouterView />
  </div>
</template>

<style scoped>
.view {
  @apply p-10;
  margin: 70px 0 0 172px;
}
</style>
