<template>
  <button
    class="custom-button"
    :class="{ icon: isIcon }"
    :disabled="isDisabled"
  >
    <template v-if="!link.length">
      <div class="custom-button__content">
        <slot></slot>
      </div>
    </template>
    <RouterLink
      v-else
      :to="link"
      class="custom-button__content"
    >
      <slot></slot>
    </RouterLink>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  isIcon: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    default: "",
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.custom-button {

  &:disabled {
    .custom-button__content {
      background: var(--btn-bg-disabled);
      opacity: .8;
    }
  }

  &__content {
    @apply py-2 px-5 rounded;
    background: var(--btn-bg-primary);
    transition: var(--transition);
    border: 2px solid var(--border);

    &.icon {
      @apply p-1;

      max-height: 30px;
    }

    &:hover {
      background: var(--btn-bg-primary-hover);
    }
  }
}
</style>
