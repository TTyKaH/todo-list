<template>
  <div class="custom-field input">
    <div class="label">
      {{ props.label }}
      <span v-if="required" class="required">*</span>
    </div>

    <div class="input">
      <input v-model="value" :disabled="disabled" class="field" type="text" placeholder="Empty task will be removed"
        :class="{ error: props.hasError }" />
      <!-- TODO: что-то не то с поднятием, происходит редирект (пофикшено в слепую) -->
      <!-- <VueFeather
        type="trash"
        size="18px"
        class="task-delete"
        @click.stop.prevent="removeTask"
      /> -->
      <TaskActionsDropdown />
    </div>
    <div class="bottom-text">
      <slot name="tip"></slot>
      <div v-if="Object.keys(error).length" class="error-text">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { TaskForDeleting } from '@/types/todo/task'
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
  }>(),
  {
    modelValue: "",
    label: "",
    required: false,
    disabled: false,
    hasError: false,
    error: () => ({}),
    taskId: null,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "delete", value: TaskForDeleting): void;
}>();

const value = computed<string>({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

const removeTask = () => {
  emit('delete', {
    id: props.taskId,
    idx: props.taskIdx
  })
}
</script>

<style scoped lang="scss">
.custom-field {
  .field {
    @apply relative;
  }
}
</style>