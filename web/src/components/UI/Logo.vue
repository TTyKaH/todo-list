<template>
  <div class="logo" :class="{'mx-auto': center}">
    <VueFeather type="book-open" />
    <span class="logo__app-name">Todos List</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  center: boolean;
}>(),
{
  center: false
}
)
</script>

<style lang="scss" scoped>
.logo {
  @apply flex gap-2 items-center font-semibold;
}
</style>