<template>
  <div class="todo-form">
    <FormTextarea v-model="formValue.description" />
    <FormInput v-model="formValue.description" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const formValue = ref({
  description: "",
});
</script>

<style lang="scss" scoped>
.todo-form {
  @apply w-full m-auto;
  background: var(--bg-draft);
  max-width: 800px;
}
</style>
