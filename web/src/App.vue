<template>
  <div class="view" :class="{ 'dark-theme': isDarkTheme }">
    <RouterView />
    <Loader v-if="isLoading" />
    <Notifications />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Loader from "@/components/UI/Loader.vue";
import Notifications from "@/components/UI/notifications/NotificationList.vue";
import { useToggleLoader } from "@/composable/useToggleLoader.js";

const { isLoading } = useToggleLoader();

const isDarkTheme = ref(true);
</script>

<style scoped></style>
