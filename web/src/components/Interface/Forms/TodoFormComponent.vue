<template>
  <div class="create-todo-form">
    <h3>{{ formTitle }}</h3>
    <form class="form">
      <div class="group">
        <CustomInput v-model="todoFormFields.title" label="Title" required />
        <CustomSelect
          v-model="todoFormFields.priority"
          :options="items"
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

<script setup>
import { ref, computed } from "vue";
import api from "@/api";
import { useTodosListStore } from "@/stores/todos";
import { useToggleLoader } from "@/composable/useToggleLoader.js";
import { useNotify } from "@/composable/useNotify.js";

const { loadTodos, setActiveTodoId, getActiveTodo } = useTodosListStore();

const { toggleLoader } = useToggleLoader();
const { showNotify } = useNotify();

const emit = defineEmits(["close-modal"]);

const todoFormFields = ref({
  title: "",
  priority: "",
  description: "",
  tasks: [
    {
      description: "",
      status: false,
    },
  ],
});

// Для случая, если редактируется todo
if (getActiveTodo.value) {
  todoFormFields.value = getActiveTodo.value;
}

const isEditing = computed(() => !!getActiveTodo.value);

const formTitle = computed(() => {
  return isEditing.value ? "Edit todo" : "Create todo";
});

// TODO: это должно быть вынесено в константы, либо на бек
const items = ref([
  {
    id: 1,
    text: "Low",
  },
  {
    id: 2,
    text: "Middle",
  },
  {
    id: 3,
    text: "Hight",
  },
]);

function addTask() {
  todoFormFields.value.tasks.push({
    description: "",
    status: false,
  });
}

function removeLastTask() {
  const tasksCount = todoFormFields.value.tasks.length;
  if (tasksCount === 1) return;
  todoFormFields.value.tasks.splice(todoFormFields.value.tasks.length - 1, 1);
}

async function saveTodo() {
  toggleLoader(true);
  try {
    const response = await api.todo.createTodo(todoFormFields.value);

    await loadTodos();
    showNotify("success", response.message);
    emit("close-modal");
  } catch (err) {
    showNotify("error", err.response.data.message);
  } finally {
    toggleLoader();
  }
}
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
