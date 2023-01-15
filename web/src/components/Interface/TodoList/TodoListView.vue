<template>
  <div class="todos-list">
    <TodolistItem v-for="(todo, idx) in getTodos" :todo="todo" :key="idx" />
  </div>
</template>

<script setup>
import { useTodosListStore } from "@/stores/todos";
import TodolistItem from "@/components/Interface/TodoList/TodolistItem.vue";
const { isLoading, getTodos, loadTodos } = useTodosListStore();

loadTodos();
</script>

<style lang="scss" scoped>
.todos-list {
  @apply grid gap-5 md:grid-cols-2 xl:grid-cols-3;
}
</style>
