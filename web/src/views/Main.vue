<template>
  <div class="view-main">
    <Header />
    <Sidebar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Interface/Header/Header.vue";
import Sidebar from "@/components/Interface/Sidebar/Sidebar.vue";
</script>

<style lang="scss" scoped>
.view-main {
  @apply p-10;

  margin: 70px 0 0 147px;
}
</style>
