<template>
  <div class="todos-list">
    <TodoListItem v-for="(todo, idx) in getTodos" :todo="todo" :key="idx" />
  </div>
</template>

<script setup>
import { useTodosListStore } from "@/stores/todos";
import TodoListItem from "@/components/Interface/TodoList/TodoListItemComponent.vue";

const { isLoading, getTodos, loadTodos } = useTodosListStore();

loadTodos();
</script>

<style lang="scss" scoped>
.todos-list {
  @apply grid gap-5 md:grid-cols-2 xl:grid-cols-3;
}
</style>
