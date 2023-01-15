<template>
  <div class="sidebar">
    <ul>
      <SideBarItem v-for="(item, idx) in sidebarMenu" :item="item" :key="idx" />
    </ul>
  </div>
</template>

<script setup>
import SideBarItem from "@/components/Interface/SideBar/SideBarItemComponent.vue";
const sidebarMenu = [
  {
    title: "Todo list",
    icon: "list",
  },
  {
    title: "Create todo",
    icon: "plus-square",
  },
  {
    title: "Settings",
    icon: "settings",
  },
];
</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  top: 71px;
  left: 0;
  bottom: 0;
  background-color: #f8f8f8;
}
</style>
