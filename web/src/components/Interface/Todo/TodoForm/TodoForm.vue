<template>
  <div class="create-todo-form">
    <h3>{{ formTitle }}</h3>
    <form class="form">
      <div class="group">
        <CustomInput v-model="todoFormFields.title" label="Title" required />
        <CustomSelect v-model="todoFormFields.priorityId" :options="PRIORITIES" label="Priority" optionTextKey="value" />
      </div>
      <CustomTextarea v-model="todoFormFields.description" label="Description" />
      <div class="tasks">
        <div class="task-group">
          <TaskActionsLine :prevTaskId="null" :prevTaskIdx="null" @add-task="handleAddTask" />
          <template v-for="(task, idx) in todoFormFields.tasks" :key="idx">
            <TaskInput v-model="todoFormFields.tasks[idx].description" :taskId="task?.id" :taskIdx="idx" label="Task"
              @delete="removeTask" />
            <TaskActionsLine :prevTaskId="task?.id ? task.id : null" :prevTaskIdx="idx" @add-task="handleAddTask" />
          </template>
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
import lodash from "lodash";
import type { Ref } from "vue";
import type { Todo } from "@/types/todo/todo";
import type {
  Task,
  TaskForDeleting,
  DataForAddingTaskWithPosition,
} from "@/types/todo/task";
import api from "@/api";
import { useToggleLoader } from "@/composable/useToggleLoader.js";
import { useNotify } from "@/composable/useNotify.js";
import { useTodosListStore } from "@/stores/todos";
import {
  TODO_DEFAULT_FORM_VALUE,
  TASK_FIELDS,
  PRIORITIES,
} from "@/constants/index";
import TaskInput from "@/components/Interface/Todo/TodoForm/TaskInput.vue";
import TaskActionsLine from "@/components/Interface/Todo/TodoForm/TaskActionsLine.vue";

const emit = defineEmits<{
  (e: "close-modal"): void;
}>();

const { toggleLoader } = useToggleLoader();
const { showNotify } = useNotify();
const { loadTodos, setActiveTodoId, getActiveTodo } = useTodosListStore();

const todoFormFields: Ref<Todo> = ref({ ...TODO_DEFAULT_FORM_VALUE });
const taskIdsForDeleting: Ref<number[]> = ref([]);
const activeTodo: Ref<Todo | undefined> = ref(getActiveTodo);

const taskFields: Task = { ...TASK_FIELDS };

if (activeTodo.value) {
  todoFormFields.value = lodash.cloneDeep(activeTodo.value);
}

const isEditing = computed<boolean>(() => !!activeTodo.value);

const formTitle = computed<string>(() => {
  return isEditing.value ? "Edit todo" : "Create todo";
});

// add task to specific position of tasks list
const handleAddTask = (data: DataForAddingTaskWithPosition) => {
  if (data.value === null) {
    // if prev task is not exist
    todoFormFields.value.tasks.unshift({ ...taskFields });
    return;
  }
  if (data.type === "id") {
    // if prev task has id
    const prevTaskIdx = todoFormFields.value.tasks.findIndex(
      (task) => data.value === task.id
    );
    const cuttedTasks = todoFormFields.value.tasks.splice(prevTaskIdx + 1);
    const tasksCount = todoFormFields.value.tasks.length;
    todoFormFields.value.tasks.splice(
      prevTaskIdx + 1,
      tasksCount,
      { ...taskFields },
      ...cuttedTasks
    );
    return;
  }
  // if prev task has only idx
  const cuttedTasks = todoFormFields.value.tasks.splice(data.value + 1);
  const tasksCount = todoFormFields.value.tasks.length;
  todoFormFields.value.tasks.splice(
    data.value + 1,
    tasksCount,
    { ...taskFields },
    ...cuttedTasks
  );
};

// remove todo from list and save it id if it exist
const removeTask = (TaskForDeleting: TaskForDeleting) => {
  if (TaskForDeleting.id) {
    taskIdsForDeleting.value.push(TaskForDeleting.id);
    todoFormFields.value.tasks = todoFormFields.value.tasks.filter(
      (task) => task?.id !== TaskForDeleting.id
    );
    return;
  }
  todoFormFields.value.tasks.splice(TaskForDeleting.idx, 1);
};

const prepareTasks = (tasks: Task[]) => {
  return tasks.filter((task: Task) => task.description.length);
};

const clearForm = () => {
  todoFormFields.value = { ...TODO_DEFAULT_FORM_VALUE };
};

// save todo in db
const saveTodo = async () => {
  toggleLoader(true);

  if (taskIdsForDeleting.value.length) {
    todoFormFields.value.taskIdsForDeleting = [...taskIdsForDeleting.value];
  }

  // remove tasks which don't have description
  const todoValues = lodash.cloneDeep(todoFormFields.value);
  todoValues.tasks = prepareTasks(todoValues.tasks);

  try {
    let response;
    if (!isEditing.value) {
      response = await api.todo.createTodo(todoValues);
    } else {
      response = await api.todo.updateTodo(todoValues);
    }

    await loadTodos();
    showNotify("success", response.message);
    emit("close-modal");

    // TODO: очистка полей формы происходит некорректно
    if (!isEditing.value) {
      clearForm();
    }
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
  @apply grid gap-5 md:gap-7;

  h3 {
    font-weight: 500;
  }

  .form {
    @apply grid gap-5;

    .group {
      @apply grid gap-5 md:grid-cols-2;
    }

    .tasks {
      @apply relative grid gap-3;
    }
  }
}
</style>
