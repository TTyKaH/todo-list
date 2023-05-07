<template>
  <div class="burger-menu">
    <div class="burger-menu__actions">
      <VueFeather type="log-out" @click="handleLogout" />
      <div>
        <ThemeToggler />
        <VueFeather type="x" @click="emit('close')" />
      </div>
    </div>
    <Sidebar @sidebar-click="emit('close')" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useThemeStore } from "@/stores/theme";
import { useNotify } from "@/composable/useNotify";
import ThemeToggler from "@/components/Interface/ThemeToggler.vue";
import Sidebar from "@/components/Interface/Sidebar/Sidebar.vue";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { logout } = useAuthStore();
const { isDarkThemeFromStore, toggleTheme } = useThemeStore();
const { showNotify } = useNotify();

const handleLogout = () => {
  logout();
  showNotify("success", "You have successfully logged out!");
};
</script>

<style lang="scss">
.burger-menu {
  @apply fixed inset-0 z-30;
  background: var(--bg-second-layer);

  &__actions {
    @apply flex justify-between py-4 px-2;

    &>div {
      @apply flex gap-4;
    }
  }

  .sidebar {
    @apply shadow-none;
  }
}
</style>