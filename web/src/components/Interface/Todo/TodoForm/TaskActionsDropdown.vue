<template>
  <div class="task-actions">
    <div class="task-actions__triangle"></div>
    <div class="task-actions__square"></div>
    <div class="task-actions__wrap">
      <VueFeather type="more-horizontal" size="18" />
      <div class="task-actions__dropdown">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.task-actions {
  @apply absolute -top-4 right-0 flex;

  &__triangle {
    @apply absolute;
    width: 23px;
    height: 23px;
    top: 5px;
    left: -12px;
    transform: rotate(-45deg);
    background: var(--btn-bg-primary);
    border-top: 1px solid var(--border);
  }

  &__square {
    @apply absolute;
    width: 15px;
    height: 25px;
    top: 0;
    left: -4px;
  }

  &__wrap {
    @apply relative flex items-center pt-0 pr-2 pb-4 pl-1 rounded-tr;
    background: var(--btn-bg-primary);
    border-top: 1px solid var(--border);
    border-right: 1px solid var(--border);
  }
}
</style>