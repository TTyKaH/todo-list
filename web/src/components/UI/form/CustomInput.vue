<template>
  <div
    class="custom-field input"
    :class="{ simple: isSimple }"
  >

    <div class="custom-field__wrap">
      <div
        class="label"
        v-if="!isSimple"
      >
        {{ label }}
        <span
          v-if="required"
          class="required"
        >*</span>
      </div>

      <input
        v-model="value"
        :disabled="disabled"
        class="field"
        :type="type"
        :placeholder="placeholder"
        :class="{ error: hasError }"
        :style="{'margin-bottom': hideMargin ? 0 : 'none'}"
        @blur="$emit('blur')"
      />

      <div class="bottom-text">
        <slot name="after" />
        <div class="error-text">{{ errorMessage }}</div>
      </div>
      <div class="icon">
        <slot name="icon" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "blur"): void;
}>();

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    placeholder?: string;
    isSimple?: boolean;
    required?: boolean;
    disabled?: boolean;
    hasError?: boolean;
    errorMessage?: string;
    type?: string;
    hideMargin?: boolean;
  }>(),
  {
    modelValue: "",
    label: "",
    isSimple: false,
    required: false,
    disabled: false,
    hasError: false,
    errorMessage: '',
    type: 'text',
    hideMargin: false
  }
);


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
