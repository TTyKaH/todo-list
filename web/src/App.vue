<template>
  <div class="view">
    <RouterView />
    <Loader v-if="isLoading" />
    <Notifications />
  </div>
</template>

<script setup lang="ts">
import Loader from "@/components/UI/Loader.vue";
import Notifications from "@/components/UI/notifications/NotificationList.vue";
import { useToggleLoader } from "@/composable/useToggleLoader.js";

const { isLoading } = useToggleLoader();
</script>

<style scoped></style>
