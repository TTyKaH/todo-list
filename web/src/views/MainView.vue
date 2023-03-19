<template>
  <div class="main-view">
    <ListActions></ListActions>
    <TodoList></TodoList>
  </div>
</template>

<script setup lang="ts">
import ListActions from "@/components/Interface/ListActions/ListActionsComponent.vue";
import TodoList from "@/components/Interface/Todo/TodoList.vue";
</script>

<style lang="scss" scoped>
.main-view {
  @apply grid gap-10 w-full;
}
</style>
