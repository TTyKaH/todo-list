<template>
  <div class="todo">
    <div class="todo__header">
      <div class="title">
        <div class="priority">low</div>
        <h3>{{ todo.title }}</h3>
      </div>
      <div class="actions">
        <VueFeather
          v-for="(action, idx) in actions"
          :type="action.icon"
          :key="idx"
          class="action"
          @click="
            $emit(action.emit, {
              modalName: 'remove-todo',
              id: props.todo.id,
            })
          "
        />
      </div>
    </div>
    <div class="todo__body">
      <h4>{{ todo.description }}</h4>
      <div class="tasks">
        <div class="task" v-for="(task, idx) in todo.tasks" :key="idx">
          - {{ task.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  todo: {
    type: Object,
    default: () => ({}),
  },
});

const actions = [
  {
    icon: "eye",
    emit: "review",
  },
  {
    icon: "edit",
    emit: "edit",
  },
  {
    icon: "trash",
    emit: "need-remove-todo",
  },
];
</script>

<style lang="scss" scoped>
.todo {
  border: 2px solid var(--bg-draft);

  &__header {
    @apply flex justify-between p-5;
    background: var(--bg-draft);

    .title {
      @apply flex gap-2;

      .priority {
        @apply px-2 bg-green-500;
      }
    }

    .actions {
      @apply flex gap-3;

      .action {
        cursor: pointer;
      }
    }
  }

  &__body {
    @apply p-5;

    h4 {
      @apply mb-2;
    }
  }
}
</style>
