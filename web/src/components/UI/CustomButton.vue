<template>
  <button class="custom-button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.custom-button {
  @apply py-2 px-5 border rounded;
  background: var(--draft-btn);

  &:hover {
    background: var(--draft-btn-hover);
  }
}
</style>
