<template>
  <div class="sidebar">
    <ul>
      <SideBarItem v-for="(item, idx) in sidebarMenu" :item="item" :key="idx" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import SideBarItem from "@/components/Interface/Sidebar/SidebarItemComponent.vue";
import type { SidebarItem } from "@/types/ui/sidebarItem";

const sidebarMenu: SidebarItem[] = [
  {
    title: "Todo list",
    icon: "list",
    link: "/",
  },
  // {
  //   title: "Create todo",
  //   icon: "plus-square",
  //   link: "/create-todo",
  // },
  {
    title: "Settings",
    icon: "settings",
    link: "/settings",
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
