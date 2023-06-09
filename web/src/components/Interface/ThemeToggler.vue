<template>
  <VueFeather
    :type="themeIconType"
    @click="toggleTheme"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";

const { isDarkThemeFromStore, toggleTheme } = useThemeStore();

const themeIconType = computed(() =>
  isDarkThemeFromStore.value ? "moon" : "sun"
);
</script>

<style lang="scss" scoped></style>