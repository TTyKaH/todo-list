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
      <div v-if="Object.keys(error).length" class="error-text">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, watch, ref } from "vue";
import type { SelectOption } from "@/types/ui/selectOption";

const props = withDefaults(
  defineProps<{
    modelValue: SelectOption | string;
    options: SelectOption[];
    label?: string;
    required?: boolean;
    disabled?: boolean;
    hasError?: boolean;
    error?: object;
    // TODO: Как описать этот пропс, что он может быть любой строкой?
    optionTextKey: "text";
    // При инициализации делать активным первое значение,
    // если в качестве modelValue получен null
    isSelectFirstItemIfNull: boolean;
  }>(),
  {
    options: () => [],
    label: "",
    required: false,
    disabled: false,
    hasError: false,
    error: () => ({}),
    optionTextKey: "text",
    isSelectFirstItemIfNull: true,
  }
);

const emit = defineEmits<{
  (e: "onUpdate:modelValue", value: object): void;
}>();

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

// TODO: переписать на computed кастомный v-model
watch(innerValue, (newValue) => {
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
