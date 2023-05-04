<template>
  <div class="view" :class="themeClass">
    <RouterView />
    <Loader v-if="isLoading" />
    <Notifications />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRefs, watch } from "vue";
import { useToggleLoader } from "@/composable/useToggleLoader.js";
import { useThemeStore } from "@/stores/theme";
import Notifications from "@/components/UI/notifications/NotificationList.vue";
import Loader from "@/components/UI/Loader.vue";

const { isDarkThemeFromStore } = toRefs(useThemeStore());
const { isLoading } = useToggleLoader();

const getThemeClass = () => {
  return isDarkThemeFromStore.value ? "dark-theme" : "light-theme";
};

const themeClass = ref(getThemeClass());

watch(
  () => isDarkThemeFromStore.value,
  () => (themeClass.value = getThemeClass()),
  { deep: true }
);
</script>

<style scoped lang="scss">
.view {
  background: var(--bg-first-layer);
  color: var(--text-main);
}
</style>
