<template>
  <div class="custom-field input" :class="{ simple: isSimple }">
    <div class="label" v-if="!isSimple">
      {{ props.label }}
      <span v-if="required" class="required">*</span>
    </div>

    <input
      v-model="value"
      :disabled="disabled"
      class="field"
      type="text"
      :placeholder="placeholder"
      :class="{ error: props.hasError }"
    />
    <div class="custom-field__after">
      <slot name="after" />
    </div>
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
    placeholder?: string;
    isSimple?: boolean;
    required?: boolean;
    disabled?: boolean;
    hasError?: boolean;
    error?: object;
  }>(),
  {
    modelValue: "",
    label: "",
    isSimple: false,
    required: false,
    disabled: false,
    hasError: false,
    error: () => ({}),
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const value = computed<string>({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped>
.simple {
  .field {
    @apply pt-2 overflow-ellipsis;
  }
}
</style>
