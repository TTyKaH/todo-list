<template>
  <div>
    <FormTextarea v-model="formValue.description" />
    <FormInput v-model="formValue.description" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const formValue = ref({
  description: "",
});
</script>

<style lang="scss" scoped></style>
