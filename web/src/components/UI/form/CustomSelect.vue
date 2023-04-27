<template>
  <div class="custom-field select">
    <div class="label">
      {{ props.label }}
      <span
        v-if="required"
        class="required"
      >*</span>
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
        :value="option[optionValueKey]"
      >
        <!-- TODO: как решить проблему, если выводимое поле неизвестная строка -->
        {{ option[optionTextKey] }}
      </option>
    </select>
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
import { toRefs, computed } from "vue";
import type { SelectOption } from "@/types/ui/selectOption";

// TODO: как описать тип передаваемого имитом, который может быть произвольным объектом, строкой или числом? 
const emit = defineEmits<{
  (e: "update:modelValue", value: number | string): void;
}>();

const props = withDefaults(
  defineProps<{
    modelValue: number | string;
    // TODO: можно ли как-то сделать стуркутуру иной в будущем, если в SelectOption понадобатся совсем другие ключи?
    options: SelectOption[];
    label?: string;
    required?: boolean;
    disabled?: boolean;
    hasError?: boolean;
    error?: object;
    // TODO: Как описать этот пропс, что он может быть любой строкой?
    optionTextKey?: string;
    optionValueKey?: string;
    // При инициализации делать активным первое значение,
    // если в качестве modelValue получен null
    isSelectFirstItemIfNull?: boolean;
  }>(),
  {
    options: () => [],
    label: "",
    required: false,
    disabled: false,
    hasError: false,
    error: () => ({}),
    optionTextKey: "text",
    optionValueKey: "id",
    isSelectFirstItemIfNull: true,
  }
);

const { options, modelValue, optionValueKey, isSelectFirstItemIfNull } = toRefs(props);

// const innerValue = ref();
const innerValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value)
})

if (
  (modelValue.value === null || typeof modelValue.value === "undefined") &&
  isSelectFirstItemIfNull.value
) {
  innerValue.value = options.value[0].id
} else {
  innerValue.value = modelValue.value;
}
</script>

<style lang="scss" scoped></style>
