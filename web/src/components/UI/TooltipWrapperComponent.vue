<template>
  <div class="tooltip" @mouseenter="show" @mouseleave="hide">
    <transition>
      <div class="tooltip__message" v-show="isShowTooltip">{{ tooltip }}</div>
    </transition>
    <slot>Tooltip content</slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

const props = defineProps<{
  tooltip: string;
}>();

const isShowTooltip: Ref<boolean> = ref(false);

const show = () => {
  isShowTooltip.value = true;
};

const hide = () => {
  isShowTooltip.value = false;
};
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
