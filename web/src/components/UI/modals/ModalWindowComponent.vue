<template>
  <Transition>
    <div class="modal" v-if="isShow" @click.self="close">
      <div
        ref="content"
        class="modal__content"
        :class="modalClasses"
        :style="{ 'max-width': props.maxWidth, width: width, height: height }"
      >
        <VueFeather
          type="x"
          @click="close"
          :class="{ 'if-sidebar': props.modalType === 'left' }"
        />
        <slot>Modal slot content</slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
// TODO: возможно стоит декомпозировать на два компонента по типу
import { ref, computed, watch, onBeforeUnmount } from "vue";
import type { Ref } from "vue";

type modalType = "left" | "center";
type Size = "auto" | string;

const props = withDefaults(
  defineProps<{
    modalType?: modalType;
    maxWidth?: Size;
    width?: Size;
    height?: Size;
    isShow?: boolean;
  }>(),
  {
    modalType: "center",
    maxWidth: "auto",
    width: "auto",
    height: "auto",
    isShow: false,
  }
);

const emit = defineEmits<{
  (e: "close"): void;
}>();

// если модальное окно не по центру, то пропс height не будет иметь эффекта
const height = computed<string>(() => {
  return props.modalType === "center" ? props.height : "";
});

const isShowContent: Ref<boolean> = ref(false);

const content: Ref<HTMLElement | undefined> = ref();

watch(
  () => props.isShow,
  () => {
    if (props.isShow) {
      setTimeout(() => {
        isShowContent.value = true;
      }, 0);
    } else {
      isShowContent.value = false;
    }
  }
);

const sideModalSettings = ref([
  {
    modalType: "left",
    classes: "left absolute -left-full",
  },
  {
    modalType: "center",
    classes: "center",
  },
]);

const modalClasses = computed(() => {
  let classes = "";

  if (props.modalType === "left") {
    classes = sideModalSettings.value[0].classes;
    if (isShowContent.value) classes = classes + " left-0";
  } else {
    classes = sideModalSettings.value[1].classes;
  }

  return classes;
});

const close = () => {
  content.value?.classList.remove("left-0");
  emit("close");
};
</script>

<style lang="scss" scoped>
.modal {
  @apply fixed inset-0 z-30 flex;
  background: var(--bg-draft-modal);

  &__content {
    @apply py-5 px-7 relative w-full;
    background: var(--bg-draft);
    transition: left 0.3s linear;

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

  .left-0 {
    left: 0 !important;
  }
}
</style>
