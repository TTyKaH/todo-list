<template>
  <div class="tooltip" @mouseenter="show" @mouseleave="hide" ref="tooltipWrap">
    <transition>
      <div
        class="tooltip__message"
        v-show="isShowTooltip"
        ref="tooltipElement"
        :style="tooltipStylePosition"
      >
        {{ tooltip }}
      </div>
    </transition>
    <slot>Tooltip content</slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { useOnResizeAndScroll } from "@/composable/useOnResizeAndScroll";

const props = defineProps<{
  tooltip: string;
}>();

const tooltipWrap: Ref<HTMLElement | undefined> = ref();
const tooltipElement: Ref<HTMLElement | undefined> = ref();
const tooltipStylePosition = ref({
  top: "",
  left: "",
});

const isShowTooltip: Ref<boolean> = ref(false);

const show = () => {
  isShowTooltip.value = true;
};

const hide = () => {
  isShowTooltip.value = false;
};

const calcPosition = () => {
  const wrapperPosition = tooltipWrap.value?.getBoundingClientRect();

  if (wrapperPosition) {
    tooltipStylePosition.value.top = `${
      wrapperPosition?.top + wrapperPosition?.height + 10
    }px`;
  }
};

useOnResizeAndScroll(calcPosition);

onMounted(() => {
  calcPosition();
});
</script>

<style lang="scss" scoped>
.tooltip {
  @apply grid align-middle z-10;

  &__message {
    @apply fixed rounded-md py-1 px-3 whitespace-nowrap z-50;

    background: var(--bg-second-layer);
    border: 1px solid var(--border);
    // box-shadow: 2px 2px 7px var(--shadow);
  }
}
</style>
