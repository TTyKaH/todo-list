<template>
  <div class="create-todo-form">
    <h3>Create todo</h3>
    <CustomInput v-model="todoFormFields.title" label="Title" />
    <CustomTextarea v-model="todoFormFields.description" label="Description" />
    <div class="tasks">
      <CustomInput
        v-for="(task, idx) in todoFormFields.tasks"
        :key="idx"
        v-model="todoFormFields.tasks[idx].description"
        label="Task"
      />
      <div class="task-action">
        <TooltipWrapper tooltip="add task">
          <VueFeather type="plus-square" @click="addTask" />
        </TooltipWrapper>
        <TooltipWrapper tooltip="remove last task">
          <VueFeather type="minus-square" @click="removeLastTask" />
        </TooltipWrapper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const todoFormFields = ref({
  title: "",
  description: "",
  tasks: [
    {
      description: "",
    },
  ],
});

function addTask() {
  todoFormFields.value.tasks.push({
    description: "",
  });
}
function removeLastTask() {
  const tasksCount = todoFormFields.value.tasks.length;
  if (tasksCount === 1) return;
  todoFormFields.value.tasks.splice(todoFormFields.value.tasks.length - 1, 1);
}
</script>

<style lang="scss" scoped>
.create-todo-form {
  @apply grid gap-5;

  .tasks {
    @apply relative grid gap-3;

    .task-action {
      @apply flex absolute right-0 -bottom-8;
    }
  }
}
</style>
