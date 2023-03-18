<template>
  <div class="todos-list">
    <TodoListItem
      v-for="(todo, idx) in getTodos"
      :todo="todo"
      :key="idx"
      @need-review-todo="toggleModal"
      @need-remove-todo="toggleModal"
      @need-edit-todo="toggleModal"
    />
    <!-- TODO: Метод переключения модалки тоже вынести как глобальный -->
    <ModalWindow
      v-if="activeModalName === 'remove-todo'"
      @close="toggleModal"
      position="center"
    >
      <!-- TODO: вынести в компонент, так как при онмаунтинге необходимо убирать активный элемент -->
      <div class="dialog">
        <h3>Remove todo?</h3>
        <div class="actions">
          <CustomButton @click="toggleModal">Cancel</CustomButton>
          <!-- TODO: Методы связанные с сущностью todo необходимо вынести в общий файл -->
          <CustomButton @click="removeTodo()">Remove</CustomButton>
        </div>
      </div>
    </ModalWindow>
    <ModalWindow v-if="activeModalName === 'edit-todo'" @close="toggleModal">
      <TodoForm @close-modal="toggleModal" />
    </ModalWindow>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "@/api";
import { useTodosListStore } from "@/stores/todos";
import { useToggleLoader } from "@/composable/useToggleLoader.js";
import { useNotify } from "@/composable/useNotify.js";
import TodoListItem from "@/components/Interface/TodoList/TodoListItemComponent.vue";
import TodoForm from "@/components/Interface/Forms/TodoFormComponent.vue";

const { getTodos, getActiveTodo, loadTodos } = useTodosListStore();
const { toggleLoader } = useToggleLoader();
const { showNotify } = useNotify();

const activeModalName = ref("");

const activeTodo = ref(getActiveTodo);

loadTodos();

// TODO: сделать метод глобальным
function toggleModal(modalName: string = "") {
  activeModalName.value = modalName;
}

async function removeTodo() {
  toggleLoader(true);
  try {
    const response = await api.todo.removeTodo(activeTodo.value);

    await loadTodos();
    showNotify("success", response.message);
    toggleModal();
    // TODO: what to do with this?
  } catch (err: any) {
    showNotify("error", err.response.data.message);
  } finally {
    toggleLoader();
  }
}
</script>

<style lang="scss" scoped>
.todos-list {
  @apply grid gap-5 md:grid-cols-2 xl:grid-cols-3;
}
</style>
