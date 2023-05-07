<template>
  <div class="sidebar">
    <ul>
      <SideBarItem
        v-for="(item, idx) in sidebarMenu"
        :item="item"
        :key="idx"
        @click="emit('sidebar-click')"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import SideBarItem from "@/components/Interface/Sidebar/SidebarItem.vue";
import type { SidebarItem } from "@/types/ui/sidebarItem";

const emit = defineEmits<{
  (e: "sidebar-click"): void;
}>();

const sidebarMenu: SidebarItem[] = [
  {
    title: "Todo list",
    icon: "list",
    link: "/todo-list",
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
  @apply z-10;
  background-color: var(--bg-second-layer);
  box-shadow: -19px 27px 16px 12px var(--shadow);
}
</style>
