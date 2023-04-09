<template>
  <button
    class="custom-button"
    :class="{ icon: isIcon }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  isIcon: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.custom-button {
  @apply py-2 px-5 border rounded;
  background: var(--draft-btn);
  transition: var(--transition);

  &.icon {
    @apply p-1;

    max-height: 30px;
  }

  &:hover {
    background: var(--draft-btn-hover);
  }
}
</style>
