<template>
  <div class="main-view">
    <ListSettingsView></ListSettingsView>
    <TodoListView></TodoListView>
  </div>
</template>

<script setup>
import ListSettingsView from "@/components/Interface/ListSettings/ListSettingsView.vue";
import TodoListView from "@/components/Interface/TodoList/TodoListView.vue";
</script>

<style lang="scss" scoped>
.main-view {
  display: grid;
  gap: 20px;
}
</style>
