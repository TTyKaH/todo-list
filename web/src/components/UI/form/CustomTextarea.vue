<template>
  <div class="custom-field textarea">
    <div class="label">
      {{ props.label }}
      <span v-if="required" class="required">*</span>
    </div>
    <textarea
      v-model="value"
      :disabled="disabled"
      class="field"
      :class="{ error: props.hasError }"
      :style="{ 'margin-bottom': hideMargin ? 0 : 'none' }"
    />
    <div class="bottom-text">
      <slot name="tip"></slot>
      <div v-if="Object.keys(error).length" class="error-text">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    hasError?: boolean;
    error?: object;
    hideMargin: boolean;
  }>(),
  {
    label: "",
    required: false,
    disabled: false,
    hasError: false,
    error: () => ({}),
    hideMargin: false
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const value = computed<string>({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped></style>
