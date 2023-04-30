<template>
  <div class="task-actions-line">
    <TooltipWrapper class="action" tooltip="add task" @click="addTask">
      <VueFeather type="plus" size="12" />
    </TooltipWrapper>
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
.task-actions-line {
  @apply w-full relative my-2 bg-gray-100;

  height: 3px;
  transition: var(--transition);

  .action {
    @apply absolute right-0 opacity-100 md:opacity-0;

    top: -6.5px;
    transition: var(--transition);

    i {
      @apply border-2;

      background-color: var(--bg-draft);
    }
  }

  &:hover {
    @apply bg-gray-200;

    .action {
      @apply opacity-100;
    }
  }
}
</style>