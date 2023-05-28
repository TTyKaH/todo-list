<template>
  <div class="task-actions">
    <div class="task-actions__triangle"></div>
    <div class="task-actions__square"></div>
    <Dropdown ref="dropdown">
      <template v-slot:button>
        <VueFeather
          type="more-horizontal"
          size="18"
        />
      </template>
      <template v-slot:content>
        <div class="actions">
          <div @click="addTask">add new task</div>
          <div @click="complete">complete</div>
          <div v-if="isCanRemoveTask" @click="remove">remove</div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: "add-task"): void;
  (e: "complete"): void;
  (e: "remove"): void;
}>();

const props = withDefaults(
  defineProps<{
    isCanRemoveTask: boolean,
  }>(),
  {
    isCanRemoveTask: false
  }
)

const dropdown = ref()

const addTask = () => {
  dropdown.value.toggleDropdown()
  emit('add-task')
}

const complete = () => {
  dropdown.value.toggleDropdown()
  emit('complete')
}

const remove = () => {
  dropdown.value.toggleDropdown()
  emit('remove')
}
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

  :deep(.dropdown) {
    @apply relative flex items-center pt-0 rounded-tr;
    background: var(--btn-bg-primary);
    border-top: 1px solid var(--border);
    border-right: 1px solid var(--border);

    .dropdown__button {
      @apply pr-2 pb-4 pl-1;
    }

    .dropdown__content {
      top: 65%;
      right: 0;
    }
  }
}
</style>