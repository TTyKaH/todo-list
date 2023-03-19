<template>
  <div class="notifications">
    <TransitionGroup name="notifications">
      <Notification
        v-for="(notification, idx) in notifications"
        :key="idx"
        :notify="notification"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import Notification from "@/components/UI/notifications/NotificationListItem.vue";
import { useNotificationsStore } from "@/stores/notifications";

const store = useNotificationsStore();

const { getNotifications: notifications } = store;
</script>

<style lang="scss" scoped>
.notifications {
  @apply fixed right-4 bottom-4 grid gap-2 z-50;
}
</style>
