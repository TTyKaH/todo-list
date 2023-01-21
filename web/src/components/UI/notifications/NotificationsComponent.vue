<template>
  <div class="notifications">
    <Notify
      v-for="(notify, idx) in notifications"
      :key="idx"
      :notify="notify"
    />
  </div>
</template>

<script setup>
import Notify from "@/components/UI/notifications/NotifyComponent.vue";
import { useNotificationsStore } from "@/stores/notifications";

const store = useNotificationsStore();

const { getNotifications: notifications } = store;
</script>

<style lang="scss" scoped>
.notifications {
  @apply fixed right-4 bottom-4 grid gap-2;
}
</style>
