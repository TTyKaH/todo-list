<template>
  <div class="custom-field textarea">
    <div class="label">
      {{ props.label }}
      <span v-if="required" class="required">*</span>
    </div>
    <textarea
      :value="props.modelValue"
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

<script setup>
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
  hasError: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Object,
    default: () => ({}),
  },
});
defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped></style>
