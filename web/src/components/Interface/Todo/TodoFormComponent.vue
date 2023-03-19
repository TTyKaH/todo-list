<template>
  <div class="create-todo-form">
    <h3>{{ formTitle }}</h3>
    <form class="form">
      <div class="group">
        <CustomInput v-model="todoFormFields.title" label="Title" required />
        <CustomSelect
          v-model="todoFormFields.priority"
          :options="priorities"
          label="Priority"
        />
      </div>
      <CustomTextarea
        v-model="todoFormFields.description"
        label="Description"
      />
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
    </form>
    <div class="form-actions">
      <CustomButton @click="saveTodo">Save</CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";
import type { Ref } from "vue";
import api from "@/api";
import { useToggleLoader } from "@/composable/useToggleLoader.js";
import { useNotify } from "@/composable/useNotify.js";
import { useTodosListStore } from "@/stores/todos";
import { TODO_DEFAULT_FORM_VALUE } from "@/constants/index";
import type { Todo } from "@/types/todo/todo";
import { priorities } from "@/constants/index";

const emit = defineEmits<{
  (e: "close-modal"): void;
}>();

const { toggleLoader } = useToggleLoader();
const { showNotify } = useNotify();
const { loadTodos, setActiveTodoId, getActiveTodo } = useTodosListStore();

const todoFormFields: Ref<Todo> = ref({ ...TODO_DEFAULT_FORM_VALUE });
const activeTodo: Ref<Todo | undefined> = ref(getActiveTodo);

// TODO: нет клонирования, сохранятеся ссылка
// Для случая, если редактируется todo
if (activeTodo.value) {
  todoFormFields.value = activeTodo.value;
}

const isEditing = computed<boolean>(() => !!activeTodo.value);

const formTitle = computed<string>(() => {
  return isEditing.value ? "Edit todo" : "Create todo";
});

const addTask = () => {
  todoFormFields.value.tasks.push({
    description: "",
    status: false,
  });
};

const removeLastTask = () => {
  const tasksCount = todoFormFields.value.tasks.length;
  if (tasksCount === 1) return;
  todoFormFields.value.tasks.splice(todoFormFields.value.tasks.length - 1, 1);
};

const saveTodo = async () => {
  toggleLoader(true);

  try {
    let response;
    if (!isEditing.value) {
      response = await api.todo.createTodo(todoFormFields.value);
    } else {
      response = await api.todo.updateTodo(todoFormFields.value);
    }

    await loadTodos();
    showNotify("success", response.message);
    emit("close-modal");
    // TODO: я так и не смог найти решения, как протипизировать ответ с бека
    // хотя ошибка может быть нетолько с бека
  } catch (err: any) {
    showNotify("error", err.response.data.message);
  } finally {
    toggleLoader();
  }
};

onBeforeUnmount(() => {
  setActiveTodoId();
});
</script>

<style lang="scss" scoped>
.create-todo-form {
  @apply grid gap-7;

  .form {
    @apply grid gap-5;

    .group {
      @apply grid grid-cols-2 gap-5;
    }

    .tasks {
      @apply relative grid gap-3;

      .task-action {
        @apply flex absolute right-0 -bottom-8;
      }
    }
  }
}
</style>
