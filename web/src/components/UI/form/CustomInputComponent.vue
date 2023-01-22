<template>
  <div class="custom-field input">
    <div class="label">{{ props.label }}</div>
    <input
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="field"
      :class="{ error: props.hasError }"
    />
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
