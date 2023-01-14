<script setup lang="ts">
import SidebarView from "@/components/Interface/SideBar/SidebarView.vue";
import HeaderView from "@/components/Interface/Header/HeaderView.vue";
</script>

<template>
  <HeaderView></HeaderView>
  <SidebarView></SidebarView>
  <div class="view">
    <RouterView />
  </div>
</template>

<style scoped>
.view {
  margin: 70px 0 0 150px;
  padding: 20px;
}
</style>
