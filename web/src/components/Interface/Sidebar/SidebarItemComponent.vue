<template>
  <li class="side-bar__item">
    <router-link :to="item.link">
      <VueFeather :type="item.icon" />
      {{ item.title }}
    </router-link>
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
  a {
    @apply flex gap-2 py-4 px-7 cursor-pointer;

    &:hover {
      background: var(--bg-draft-second);
    }
  }
}
</style>
