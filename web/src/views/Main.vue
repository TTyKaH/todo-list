<template>
  <div class="view-main">
    <Header class="header" />
    <Sidebar class="sidebar" />
    <RouterView class="router" />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Interface/Header/Header.vue";
import Sidebar from "@/components/Interface/Sidebar/Sidebar.vue";
</script>

<style lang="scss" scoped>
.view-main {
  display: grid;
  grid-template-columns: 150px auto;
  grid-template-rows: 70px auto;
  // grid-template-rows: 70px calc(100vh);
  grid-template-areas:
    "header  header"
    "sidebar router";

  .header {
    grid-area: header;
  }

  .sidebar {
    grid-area: sidebar;
  }

  .router {
    @apply p-5 px-2 md:px-4 lg:p-7 lg:px-7;
    grid-area: router;
    background: var(--bg-first-layer);
  }

  @media (max-width: 767px) {
    @apply flex flex-col;

    .sidebar {
      @apply hidden;
    }
  }
}
</style>
