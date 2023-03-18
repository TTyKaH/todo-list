<template>
  <div class="custom-field input">
    <div class="label">
      {{ props.label }}
      <span v-if="required" class="required">*</span>
    </div>

    <input
      v-model="value"
      :disabled="disabled"
      class="field"
      type="text"
      :class="{ error: props.hasError }"
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
    label: string;
    required: boolean;
    disabled: boolean;
    hasError: boolean;
    error: object;
  }>(),
  {
    modelValue: "",
    label: "",
    required: false,
    disabled: false,
    hasError: false,
    error: () => ({}),
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped></style>
