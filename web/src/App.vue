<script setup lang="ts">
import HeaderView from "@/components/Interface/Header/HeaderView.vue";
import SidebarView from "@/components/Interface/SideBar/SidebarView.vue";
</script>

<template>
  <div class="view">
    <HeaderView></HeaderView>
    <SidebarView></SidebarView>
    <RouterView />
  </div>
</template>

<style scoped>
.view {
  margin: 70px 0 0 150px;
  padding: 20px;
}
</style>
