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
          @click="action.function('remove-todo')"
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
    <!-- TODO: Модальное окно будет отрисовываться несколько раз - плохо -->
    <!-- TODO: Метод переключения модалки тоже вынести -->
    <ModalWindow
      v-if="activeModalName === 'remove-todo'"
      @close="toggleModal"
      position="center"
      height="auto"
      width="350px"
    >
      <div class="dialog">
        <h3>Remove todo?</h3>
        <div class="actions">
          <CustomButton @click="toggleModal">Cancel</CustomButton>
          <!-- TODO: Методы связанные с сущностью todo необходимо вынести в общий файл -->
          <CustomButton @click="removeTodo(todo.id)">Remove</CustomButton>
        </div>
      </div>
    </ModalWindow>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/api";
import { useToggleLoader } from "@/composable/useToggleLoader.js";
import { useNotify } from "@/composable/useNotify.js";

const { toggleLoader } = useToggleLoader();
const { showNotify } = useNotify();

const props = defineProps({
  todo: {
    type: Object,
    default: () => ({}),
  },
});

const actions = [
  {
    icon: "eye",
    function: "review",
  },
  {
    icon: "edit",
    function: "edit",
  },
  {
    icon: "trash",
    function: toggleModal,
  },
];

const activeModalName = ref("");

// TODO: сделать метод глобальным
function toggleModal(modalName = "") {
  activeModalName.value = modalName;
}

async function removeTodo(id) {
  toggleLoader(true);
  try {
    const res = await api.todo.removeTodo({
      id: id,
    });
    showNotify("success", "succes");
    toggleModal();
  } catch (err) {
    showNotify("error", "error");
  } finally {
    toggleLoader();
  }
}
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

.dialog {
  @apply grid gap-5;

  .actions {
    @apply flex gap-5;
  }
}
</style>
