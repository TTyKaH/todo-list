<template>
  <div class="notify">
    <div class="type" :class="props.notify.type" />
    <div class="message">{{ props.notify.message }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  notify: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.notify {
  @apply flex;
  background: var(--bg-draft);
  width: 200px;

  .type {
    @apply w-1.5;

    &.error {
      background: red;
    }

    &.success {
      background: green;
    }

    &.neutral {
      background: blue;
    }
  }

  .message {
    @apply px-4 py-3 w-full border border-l-0;
  }
}
</style>
