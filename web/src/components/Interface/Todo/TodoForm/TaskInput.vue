<template>
  <div class="custom-field input">
    <div class="label task-label">
      {{ props.label }}
      <span
        v-if="required"
        class="required"
      >*</span>
    </div>

    <div class="input">
      <input
        v-model="value"
        :disabled="disabled"
        class="field"
        type="text"
        placeholder="Empty task will be removed"
        :class="{ error: props.hasError }"
      />
      <!-- TODO: что-то не то с поднятием, происходит редирект (пофикшено в слепую) -->
      <!-- <VueFeather
        type="trash"
        size="18px"
        class="task-delete"
        @click.stop.prevent="removeTask"
      /> -->
      <TaskActionsDropdown :isCanRemoveTask="isCanRemoveTask" @add-task="addTask" @complete="completeTask" @remove="removeTask"/>
    </div>
    <div class="bottom-text">
      <slot name="tip"></slot>
      <div
        v-if="Object.keys(error).length"
        class="error-text"
      >{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { DataForAddingTaskWithPosition, TaskForAction } from '@/types/todo/task'
import TaskActionsDropdown from "@/components/Interface/Todo/TodoForm/TaskActionsDropdown.vue"

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    hasError?: boolean;
    error?: object;

    taskId?: number | null;
    taskIdx: number;

    prevTaskId: number | null;
    prevTaskIdx: number | null;

    isCanRemoveTask: boolean;
  }>(),
  {
    modelValue: "",
    label: "",
    required: false,
    disabled: false,
    hasError: false,
    error: () => ({}),
    taskId: null,
    isCanRemoveTask: false
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "add-task", value: DataForAddingTaskWithPosition): void;
  (e: "delete", value: TaskForAction): void;
}>();

const value = computed<string>({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

const addTask = () => {
  props.prevTaskId
    ? emit("add-task", { type: "id", value: props.prevTaskId })
    : emit("add-task", { type: "idx", value: props.prevTaskIdx });
};

const completeTask = () => {

}

const removeTask = () => {
  emit('delete', {
    id: props.taskId,
    idx: props.taskIdx
  })
}
</script>