<template>
  <div class="review-todo">
    <h3>Review todo</h3>
    <div class="title">
      <div class="priority">low</div>
      <h3>{{ todo.title }}</h3>
    </div>
    <div class="description">{{ todo.description }}</div>
    <ul class="tasks">
      <li v-for="(task, idx) in todo.tasks" :key="idx">
        - {{ task.description }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import type { Ref } from "vue";
import { useTodosListStore } from "@/stores/todos";
import type { Todo } from "@/types/todo/todo";

const { setActiveTodoId, getActiveTodo } = useTodosListStore();

const DEFAULT_FORM_VALUE: Todo = {
  title: "",
  priority: "",
  description: "",
  tasks: [
    {
      description: "",
      status: false,
    },
  ],
};

const todo: Ref<Todo> = ref({ ...DEFAULT_FORM_VALUE });

// TODO: нет клонирования, сохранятеся ссылка
if (getActiveTodo.value) {
  todo.value = getActiveTodo.value;
}

onBeforeUnmount(() => {
  setActiveTodoId();
});
</script>

<style lang="scss" scoped>
.review-todo {
  @apply grid gap-5 w-full;
  max-width: 500px;

  .title {
    @apply flex gap-2;

    .priority {
      @apply px-2 bg-green-500;
    }
  }

  .tasks {
    @apply grid gap-2;
  }
}
</style>
