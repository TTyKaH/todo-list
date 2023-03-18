<template>
  <div class="todo">
    <div class="todo__header">
      <div class="title">
        <div class="priority">low</div>
        <h3>{{ todo.title }}</h3>
      </div>
      <div class="actions">
        <VueFeather
          v-for="(action, idx) in actions"
          :type="action.icon"
          :key="idx"
          class="action"
          @click="emitAction(action)"
        />
      </div>
    </div>
    <div class="todo__body">
      <h4>{{ todo.description }}</h4>
      <div class="tasks">
        <div class="task" v-for="(task, idx) in todo.tasks" :key="idx">
          - {{ task.description }}
        </div>
      </div>
      <VueFeather type="chevron-down" size="48" stroke="#f8f8f8" />
      <div class="hider" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodosListStore } from "@/stores/todos";
import type { Todo } from "@/types/todo/todo";
import type { todoAction } from "@/types/ui/todoAction";

const { setActiveTodoId } = useTodosListStore();

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  (e: "need-review-todo", modalName: string): void;
  (e: "need-edit-todo", modalName: string): void;
  (e: "need-remove-todo", modalName: string): void;
}>();

const actions: todoAction[] = [
  {
    icon: "eye",
    emit: "need-review-todo",
    modalName: "review-todo",
  },
  {
    icon: "edit",
    emit: "need-edit-todo",
    modalName: "edit-todo",
  },
  {
    icon: "trash",
    emit: "need-remove-todo",
    modalName: "remove-todo",
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
  border: 2px solid var(--bg-draft);
  max-height: 250px;

  &__header {
    @apply flex justify-between p-5;
    background: var(--bg-draft);

    .title {
      @apply flex gap-2;

      .priority {
        @apply px-2 bg-green-500;
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
    @apply p-5 h-full;

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

      background-color: var(--bg-draft);

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
        border-bottom-color: var(--bg-draft);
        border-left-width: 0;
      }
      &::after {
        right: 0;
        border-bottom-color: var(--bg-draft);
        border-right-width: 0;
      }
    }
  }
}
</style>
