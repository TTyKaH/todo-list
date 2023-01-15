<template>
  <div class="todo">
    {{ todo.title }}
  </div>
</template>

<script setup>
const props = defineProps({
  todo: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
.todo {
}
</style>