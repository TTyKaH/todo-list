<template>
  <div class="custom-field input">
    <div class="label">
      {{ props.label }}
      <span v-if="required" class="required">*</span>
    </div>
    <input
      :value="props.modelValue"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
      class="field"
      :class="{ error: props.hasError }"
    />
    <div class="bottom-text">
      <slot name="tip"></slot>
      <div v-if="error.length" class="error-text">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped></style>
