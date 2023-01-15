<template>
  <div>s</div>
</template>

<script setup>
import { useTodosListStore } from "@/stores/todos";

const { isLoading, getTodos, loadTodos } = useTodosListStore();

loadTodos();
</script>

<style lang="scss" scoped></style>
