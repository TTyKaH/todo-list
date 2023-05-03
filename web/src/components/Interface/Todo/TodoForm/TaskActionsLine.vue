<template>
  <div class="task-actions">
    <div class="task-actions__line">
      <TooltipWrapper class="action" tooltip="add task" @click="addTask">
        <VueFeather type="plus" size="12" />
      </TooltipWrapper>
    </div>
  </div>
</template>


<!-- На данный момент компонент реализует только функционал создания нового таска 
    с учетом места отрисовки компонента-->
<script setup lang="ts">
import type { DataForAddingTaskWithPosition } from "@/types/todo/task";

const emit = defineEmits<{
  (e: "add-task", value: DataForAddingTaskWithPosition): void;
}>();

const props = defineProps<{
  prevTaskId: number | null;
  prevTaskIdx: number | null;
}>();

// сообщаем родителю, что необходимо добавить таск
const addTask = () => {
  props.prevTaskId
    ? emit("add-task", { type: "id", value: props.prevTaskId })
    : emit("add-task", { type: "idx", value: props.prevTaskIdx });
};
</script>

<style lang="scss" scoped>
.task-actions {
  @apply w-full relative py-2 my-0.5;

  height: 3px;
  transition: var(--transition);

  &__line {
    background: var(--border);
    height: 2px;

    .action {
      @apply absolute right-0 opacity-100 top-0 md:opacity-0;

      transition: var(--transition);

      i {
        @apply border-2;

        background-color: var(--bg-second-layer);
      }
    }
  }

  &:hover {
    .action {
      @apply opacity-100;
    }
  }
}
</style>