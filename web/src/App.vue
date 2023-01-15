<script setup lang="ts">
import HeaderView from "@/components/Interface/Header/HeaderView.vue";
import SidebarComponent from "@/components/Interface/SideBar/SidebarComponent.vue";
</script>

<template>
  <div class="view">
    <HeaderView></HeaderView>
    <SidebarComponent></SidebarComponent>
    <RouterView />
  </div>
</template>

<style scoped>
.view {
  @apply p-10;
  margin: 70px 0 0 172px;
}
</style>
