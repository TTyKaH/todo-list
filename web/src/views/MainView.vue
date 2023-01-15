<template>
  <div class="main-view">
    <ListActions></ListActions>
    <TodoList></TodoList>
  </div>
</template>

<script setup>
import ListActions from "@/components/Interface/ListActions/ListActionsComponent.vue";
import TodoList from "@/components/Interface/TodoList/TodoListComponent.vue";
</script>

<style lang="scss" scoped>
.main-view {
  @apply grid gap-10 w-full;
}
</style>
