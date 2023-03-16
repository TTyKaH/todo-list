<template>
  <div class="custom-field select">
    <div class="label">
      {{ props.label }}
      <span v-if="required" class="required">*</span>
    </div>
    <select
      v-if="options.length > 0"
      v-model="innerValue"
      :disabled="disabled"
      class="field"
    >
      <option
        v-for="(option, idx) in options"
        :key="`option_${idx}`"
        :value="option"
      >
        {{ option[optionTextKey] }}
      </option>
    </select>
    <div class="bottom-text">
      <slot name="tip"></slot>
      <div v-if="error.length" class="error-text">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, watch, ref } from "vue";

const emit = defineEmits(["onUpdate:modelValue"]);

const props = defineProps({
  modelValue: {
    type: [Object, String],
  },
  options: {
    type: Array,
    required: true,
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
  optionTextKey: {
    type: String,
    default: "text",
  },
  isSelectFirstItemIfNull: {
    // При инициализации делать активным первое значение,
    // если в качестве modelValue получен null
    type: Boolean,
    required: false,
    default: true,
  },
});

const { options, modelValue, isSelectFirstItemIfNull } = toRefs(props);

const innerValue = ref();
if (
  (modelValue.value === null || typeof modelValue.value === "undefined") &&
  isSelectFirstItemIfNull.value
) {
  innerValue.value = options.value[0];
  emit("onUpdate:modelValue", innerValue.value);
} else {
  innerValue.value = modelValue.value;
}

watch(innerValue, (newValue) => {
  console.log("inner value обновился");
  console.log("innerValue.value", innerValue.value);
  console.log("newValue", newValue);
  // if (innerValue.value !== newValue) {
  emit("onUpdate:modelValue", newValue);
  // }
});

watch(modelValue, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    innerValue.value = newValue;
  }
});
</script>

<style lang="scss" scoped></style>
