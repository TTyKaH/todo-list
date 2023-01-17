<template>
  <div class="tooltip" @mouseenter="show" @mouseleave="hide">
    <transition>
      <div class="tooltip__message" v-show="isShowTooltip">{{ tooltip }}</div>
    </transition>
    <slot>Tooltip content</slot>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  tooltip: {
    type: String,
    default: "Tooltip message",
  },
});

const isShowTooltip = ref(false);

function show() {
  isShowTooltip.value = true;
}

function hide() {
  isShowTooltip.value = false;
}
</script>

<style lang="scss" scoped>
.tooltip {
  @apply relative grid align-middle;

  &__message {
    @apply absolute border rounded-md py-1 px-3 whitespace-nowrap;

    top: calc(100% + 10px);
    background: var(--bg-draft);
  }
}
</style>
