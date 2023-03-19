<template>
  <div class="view">
    <Header />
    <Sidebar />
    <RouterView />
    <Loader v-if="isLoading" />
    <Notifications />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Interface/Header/Header.vue";
import Sidebar from "@/components/Interface/Sidebar/Sidebar.vue";
import Loader from "@/components/UI/Loader.vue";
import Notifications from "@/components/UI/notifications/NotificationList.vue";
import { useToggleLoader } from "@/composable/useToggleLoader.js";

const { isLoading } = useToggleLoader();
</script>

<style scoped>
.view {
  @apply p-10;
  margin: 70px 0 0 172px;
}
</style>
