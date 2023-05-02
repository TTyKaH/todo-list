<template>
  <li class="side-bar__item">
    <router-link :to="item.link">
      <VueFeather :type="item.icon" />
      {{ item.title }}
    </router-link>
  </li>
</template>

<script setup lang="ts">
import type { SidebarItem } from "@/types/ui/sidebarItem";

const props = defineProps<{
  item: SidebarItem;
}>();
</script>

<style lang="scss" scoped>
.side-bar__item {
  a {
    @apply flex gap-2 cursor-pointer py-4 px-2 md:px-4 lg:px-7;

    &:hover {
      background: var(--btn-bg-hover);
    }
  }
}
</style>
