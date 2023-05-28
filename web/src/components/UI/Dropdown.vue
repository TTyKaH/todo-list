<template>
  <div class="dropdown">
    <div
      class="dropdown__button"
      @click="toggleDropdown"
    >
      <slot name="button" />
    </div>
    <div
      class="dropdown__content"
      v-if="isShowDropdown"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isShowDropdown = ref(false)

const toggleDropdown = () => {
  isShowDropdown.value = !isShowDropdown.value
}

defineExpose({
  toggleDropdown
})
</script>

<style lang="scss" scoped>
.dropdown {
  @apply relative;

  &__content {
    @apply absolute top-full rounded z-10;

    // Передается из места применения дропдавна в слот content
    :deep(.actions) {
      background: var(--btn-bg-primary);
      border: 1px solid var(--border);
      box-shadow: 0px 0px 5px 0px var(--shadow);

      >div {
        @apply py-1 px-2 cursor-pointer whitespace-nowrap;
        border-bottom: 1px solid var(--border);

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background-color: var(--btn-bg-hover);
        }
      }
    }
  }
}
</style>