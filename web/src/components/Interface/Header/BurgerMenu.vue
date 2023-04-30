<template>
  <div class="burger-menu">
    <div class="burger-menu__actions">
      <VueFeather type="log-out" @click="handleLogout" />
      <div>
        <VueFeather type="sun" @click="handleLogout" />
        <VueFeather type="x" @click="emit('close')" />
      </div>
    </div>
    <Sidebar />
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Interface/Sidebar/Sidebar.vue";

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<style lang="scss">
.burger-menu {
  @apply fixed inset-0 z-30;
  background: var(--bg-draft);

  &__actions {
    @apply flex justify-between py-4 px-2;

    & > div {
      @apply flex gap-4;
    }
  }
}
</style>