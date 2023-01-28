<template>
  <div class="modal" @click.self="close">
    <div
      class="modal__content"
      :class="props.position"
      :style="{ width: props.width, height: height }"
    >
      <VueFeather
        type="x"
        @click="close"
        :class="{ 'if-sidebar': props.position === 'left' }"
      />
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
    default: "auto",
  },
  height: {
    type: String,
    default: "auto",
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
  @apply fixed inset-0 z-30 flex;
  background: var(--bg-draft-modal);

  &__content {
    @apply py-5 px-7 relative;
    background: var(--bg-draft);

    i {
      @apply absolute right-2 top-2;

      &.if-sidebar {
        @apply left-full p-2 cursor-pointer right-auto top-auto;
        background: var(--draft-danger);
        color: var(--draft-text-white);
      }
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
