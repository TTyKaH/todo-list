<template>
  <div class="custom-select">
    <select v-if="options.length > 0" v-model="innerValue">
      <option
        v-for="(option, idx) in options"
        :key="`option_${idx}`"
        :value="option"
      >
        {{ option[optionTextKey] }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { toRefs, watch, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
  },
  options: {
    type: Array,
    required: true,
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
  disabled: {
    type: Boolean,
    default: false,
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

const emit = defineEmits(["update:modalValue"]);

const { options, modelValue, isSelectFirstItemIfNull } = toRefs(props);

const innerValue = ref("");
if (
  (modelValue.value === null || typeof modelValue.value === "undefined") &&
  isSelectFirstItemIfNull.value
) {
  innerValue.value = options.value[0];
  emit("update:modelValue", innerValue.value);
} else {
  innerValue.value = modelValue.value;
}

watch(innerValue, (newValue) => {
  if (innerValue.value !== newValue) {
    console.log("inner value обновился");
    emit("update:modelValue", newValue);
  }
});

watch(modelValue, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    console.log("modelValue обновился");
    innerValue.value = newValue;
  }
});
</script>

<style lang="scss" scoped></style>
