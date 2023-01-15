<template>
  <li class="side-bar__item">
    <VueFeather :type="item.icon" />
    {{ item.title }}
  </li>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.side-bar__item {
  @apply flex gap-2 py-3 px-7 cursor-pointer;

  &:hover {
    background: var(--bg-draft-second);
  }
}
</style>
