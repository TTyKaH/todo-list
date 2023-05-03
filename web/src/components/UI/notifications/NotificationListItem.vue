<template>
  <div class="notify">
    <div class="type" :class="props.notify.type" />
    <div class="message" :class="props.notify.type">
      {{ props.notify.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Notification } from "@/types/ui/notification";

const props = defineProps<{
  notify: Notification;
}>();
</script>

<style lang="scss" scoped>
.notify {
  @apply flex;
  background: var(--bg-second-layer);
  width: 250px;

  .type {
    @apply w-1.5;

    &.error {
      background: var(--error);
    }

    &.success {
      background: var(--success);
    }

    &.neutral {
      background: var(--neutral);
    }
  }

  .message {
    @apply px-4 py-3 w-full;

    &.error {
      border: 2px solid var(--error);
    }

    &.success {
      border: 2px solid var(--success);
    }

    &.neutral {
      border: 2px solid var(--neutral);
    }
  }
}
</style>
