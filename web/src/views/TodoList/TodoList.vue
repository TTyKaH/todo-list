<template>
  <div class="list">
    <div class="list__actions-and-list">
      <ListActions />
      <TodoList />
    </div>
    <Pagination />
  </div>
</template>

<script setup lang="ts">
import ListActions from "@/components/Interface/ListActions/ListActions.vue";
import TodoList from "@/components/Interface/Todo/TodoList.vue";
import Pagination from "@/components/Interface/Pagination/Pagination.vue";
</script>

<style lang="scss" scoped>
.list {
  @apply flex flex-col justify-between gap-10 w-full;

  &__actions-and-list {
    @apply flex flex-col gap-10;
  }
}
</style>
