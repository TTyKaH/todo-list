<template>
  <div class="modal" @click.self="close">
    <div
      class="modal__content"
      :class="props.position"
      :style="{ width: props.width, height: height }"
    >
      <VueFeather type="x" @click="close" />
      <slot>Modal slot content</slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  position: {
    type: String,
    default: "left", // 'center', 'left'
  },
  width: {
    type: String,
    default: "500px",
  },
  height: {
    type: String,
    default: "400px",
  },
});

const emit = defineEmits(["close"]);

// если модальное окно не по центру, то пропс height не будет иметь эффекта
const height = computed(() => {
  return props.position === "center" ? props.height : "";
});

function close() {
  emit("close");
}
</script>

<style lang="scss" scoped>
.modal {
  @apply fixed inset-0 z-50 flex;
  background: var(--bg-draft-modal);

  &__content {
    @apply p-5 relative;
    background: var(--bg-draft);

    i {
      @apply absolute left-full p-2 cursor-pointer;
      background: var(--draft-danger);
      color: var(--draft-text-white);
    }

    &.center {
      margin: auto;
    }

    &.left {
      height: 100%;
    }
  }
}
</style>
