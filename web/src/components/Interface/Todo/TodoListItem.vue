<template>
  <div class="todo">
    <div class="todo__header">
      <div class="title">
        <div class="priority" :class="priorityBgColor">
          {{ todoPriorityTitle }}
        </div>
        <h3>{{ todo.title }}</h3>
      </div>
      <div class="actions">
        <TooltipWrapper v-for="(action, idx) in actions" :key="idx" :tooltip="action.tooltip">
          <VueFeather :type="action.icon" class="action" @click="emitAction(action)" />
        </TooltipWrapper>
      </div>
    </div>
    <div class="todo__body">
      <h4>{{ todo.description }}</h4>
      <div class="tasks">
        <div class="task" v-for="(task, idx) in todo.tasks" :key="idx">
          - {{ task.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTodosListStore } from "@/stores/todos";
import type { Todo } from "@/types/todo/todo";
import type { todoAction } from "@/types/ui/todoAction";
import { PRIORITIES } from "@/constants/index";

const { setActiveTodoId } = useTodosListStore();

const emit = defineEmits<{
  (e: "need-review-todo", modalName: string): void;
  (e: "need-edit-todo", modalName: string): void;
  (e: "need-remove-todo", modalName: string): void;
}>();

const props = defineProps<{
  todo: Todo;
}>();

const todoPriorityTitle = computed(() => {
  const priority = PRIORITIES.find(
    (priority) => priority.id === props.todo.priorityId
  );
  return priority ? priority.value : "-";
});

const priorityClasses = ["low", "middle", "high"];

const priorityBgColor = computed(() => {
  if (!props.todo.priorityId) return "";
  return priorityClasses[props.todo.priorityId - 1];
});

const actions: todoAction[] = [
  {
    icon: "eye",
    emit: "need-review-todo",
    modalName: "review-todo",
    tooltip: "review",
  },
  {
    icon: "edit",
    emit: "need-edit-todo",
    modalName: "edit-todo",
    tooltip: "edit",
  },
  {
    icon: "trash",
    emit: "need-remove-todo",
    modalName: "remove-todo",
    tooltip: "remove",
  },
];

const emitAction = (action: todoAction) => {
  setActiveTodoId(props.todo.id);

  // TODO: есть ли вариант писать без switch case, а написать один вызов emit?
  switch (action.emit) {
    case "need-review-todo":
      emit("need-review-todo", action.modalName);
      break;
    case "need-edit-todo":
      emit("need-edit-todo", action.modalName);
      break;
    case "need-remove-todo":
      emit("need-remove-todo", action.modalName);
      break;
  }
};
</script>

<style lang="scss" scoped>
.todo {
  @apply relative overflow-hidden;
  background: var(--bg-second-layer);
  border: 3px solid var(--bg-second-layer);
  border-bottom: 10px solid var(--bg-second-layer);
  max-height: 200px;
  min-height: 200px;

  &__header {
    @apply flex justify-between p-5;
    background: var(--bg-second-layer);
    border-bottom: 3px solid var(--bg-first-layer);

    .title {
      @apply flex gap-2;

      .priority {
        @apply px-2 bg-green-500;

        border-radius: 5px 0 5px 0;

        &.low {
          background-color: var(--green);
        }

        &.middle {
          background-color: var(--yellow);
        }

        &.high {
          background-color: var(--red);
        }
      }
    }

    .actions {
      @apply flex gap-3;

      .action {
        cursor: pointer;
      }
    }
  }

  &__body {
    @apply p-5;

    h4 {
      @apply mb-2;
    }

    .vue-feather {
      @apply absolute;
      bottom: 4px;
      left: calc(50% - 24px);
    }

    .hider {
      @apply absolute left-0 right-0 bottom-0 h-3;

      background-color: var(--bg-second-layer);

      &::before,
      &::after {
        content: "";
        width: 50%;
        box-sizing: border-box;
        display: block;
        position: absolute;
        top: -20px;
        border: 20px solid transparent;
        border-top-width: 0;
      }

      &::before {
        left: 0;
        border-bottom-color: var(--bg-second-layer);
        border-left-width: 0;
      }

      &::after {
        right: 0;
        border-bottom-color: var(--bg-second-layer);
        border-right-width: 0;
      }
    }
  }
}
</style>
