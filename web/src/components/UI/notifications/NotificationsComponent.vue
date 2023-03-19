<template>
  <div class="notifications">
    <TransitionGroup name="notifications">
      <Notify
        v-for="(notify, idx) in notifications"
        :key="idx"
        :notify="notify"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import Notify from "@/components/UI/notifications/NotifyComponent.vue";
import { useNotificationsStore } from "@/stores/notifications";

const store = useNotificationsStore();

const { getNotifications: notifications } = store;
</script>

<style lang="scss" scoped>
.notifications {
  @apply fixed right-4 bottom-4 grid gap-2 z-50;
}
</style>
