<template>
  <div>
    <TodolistItem v-for="(todo, idx) in getTodos" :todo="todo" :key="idx"/>
  </div>
</template>

<script setup>
import { useTodosListStore } from "@/stores/todos";
import TodolistItem from "@/components/Interface/TodoList/TodolistItemView.vue";
const { isLoading, getTodos, loadTodos } = useTodosListStore();

loadTodos();
</script>

<style lang="scss" scoped>

</style>