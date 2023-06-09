<template>
  <div class="create-todo-form">
    <h3>{{ formTitle }}</h3>
    <form class="form">
      <div class="group">
        <CustomInput
          v-model="v$.title.$model"
          :hasError="v$.title.$error"
          :errorMessage="v$.title.$errors?.[0]?.$message"
          label="Title"
          required
          @blur="v$.username.$touch()"
        />
        <CustomSelect
          v-model="todoFormFields.priorityId"
          :options="PRIORITIES"
          label="Priority"
          optionTextKey="value"
        />
      </div>
      <CustomTextarea
        v-model="todoFormFields.description"
        label="Description"
      />
      <div class="tasks">
        <!-- <TaskActionsLine :prevTaskId="null" :prevTaskIdx="null" @add-task="handleAddTask" /> -->
        <template
          v-for="(task, idx) in todoFormFields.tasks"
          :key="idx"
        >
          <TaskInput
            v-model="todoFormFields.tasks[idx].description"
            :taskId="task?.id"
            :taskIdx="idx"
            label="Task"
            :prevTaskId="task?.id ? task.id : null"
            :prevTaskIdx="idx"
            :isCanRemoveTask="isCanRemoveTask"
            @add-task="handleAddTask"
            @delete="removeTask"
          />
        </template>
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
  TaskForAction,
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
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import TaskInput from "@/components/Interface/Todo/TodoForm/TaskInput.vue";

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
  if (!todoFormFields.value.tasks.length) {
    todoFormFields.value.tasks.push({
      description: '',
      status: false,
    })
  }
}

const isEditing = computed<boolean>(() => !!activeTodo.value);
const isCanRemoveTask = computed<boolean>(() => todoFormFields.value.tasks.length > 1);

const formTitle = computed<string>(() => {
  return isEditing.value ? "Edit todo" : "Create todo";
});

const rules = {
  title: { required },
}

const v$ = useVuelidate(rules, todoFormFields)

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
const removeTask = (TaskForAction: TaskForAction) => {
  if (TaskForAction.id) {
    taskIdsForDeleting.value.push(TaskForAction.id);
    todoFormFields.value.tasks = todoFormFields.value.tasks.filter(
      (task) => task?.id !== TaskForAction.id
    );
    return;
  }
  todoFormFields.value.tasks.splice(TaskForAction.idx, 1);
};

const prepareTasks = (tasks: Task[]) => {
  let order = 0
  const notEmptyOrderedTasks = tasks.filter((task: Task) => task.description.length).map((task: Task) => {
    task.order = order
    order = order + 1
    return task
  })

  return notEmptyOrderedTasks
};

const clearForm = () => {
  todoFormFields.value = { ...TODO_DEFAULT_FORM_VALUE };
};

// save todo in db
const saveTodo = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

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
    // @ts-ignore
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
    @apply grid gap-2;

    .group {
      @apply grid gap-x-5 gap-y-1 md:grid-cols-2;
    }

    .tasks {
      @apply relative grid;
    }
  }

  .form-actions {
    @apply flex justify-end;
  }
}
</style>
