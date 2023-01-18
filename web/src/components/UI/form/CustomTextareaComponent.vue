<template>
  <div class="custom-textarea">
    <div class="label">{{ props.label }}</div>
    <textarea
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="textarea"
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

<style lang="scss" scoped>
.custom-textarea {
  @apply flex relative;

  .label {
    @apply absolute left-4 text-gray-400;

    &.active {
    }
  }

  .textarea {
    @apply pt-5 pb-2 px-4 w-full border rounded;

    // box-shadow: 0 0 3px 2px transparent;

    &:focus {
      @apply outline-none;
      box-shadow: 0 0 3px 2px #eeeeee;

      &.error {
        box-shadow: 0 0 3px 2px rgb(248, 113, 113);
      }
    }

    &.error {
      @apply border-red-400;
    }
  }
}
</style>
