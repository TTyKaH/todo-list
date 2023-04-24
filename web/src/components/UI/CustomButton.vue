<template>
  <button :class="{ icon: isIcon }">
    <template v-if="!link.length">
      <div class="custom-button">
        <slot></slot>
      </div>
    </template>
    <RouterLink
      v-else
      :to="link"
      class="custom-button"
    >
      <slot></slot>
    </RouterLink>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  isIcon: {
    type: Boolean,
    default: false
  },
  link: {
    type: String,
    default: ''
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
