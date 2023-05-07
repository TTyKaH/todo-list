<template>
  <div class="todos-list">
    <TodoListItem v-for="(todo, idx) in todos" :todo="todo" :key="idx" @need-review-todo="toggleModal"
      @need-remove-todo="toggleModal" @need-edit-todo="toggleModal" />
    <ModalWindow :isShow="!!activeModalName.length" :modalType="modalSettings.position"
      :max-width="modalSettings.maxWidth" :width="modalSettings.width" @close="toggleModal">
      <!-- TODO: use component tag -->
      <TodoForm v-if="activeModalName === 'edit-todo'" @close-modal="toggleModal" />
      <TodoReview v-if="activeModalName === 'review-todo'" @close-modal="toggleModal" />
      <TodoRemove v-if="activeModalName === 'remove-todo'" @close-modal="toggleModal" />
    </ModalWindow>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { useTodosListStore } from "@/stores/todos";
import TodoListItem from "@/components/Interface/Todo/TodoListItem.vue";
import TodoReview from "@/components/Interface/Todo/TodoReview.vue";
import TodoRemove from "@/components/Interface/Todo/TodoRemove.vue";
import TodoForm from "@/components/Interface/Todo/TodoForm/TodoForm.vue";

const TodosListStore = useTodosListStore();
const { loadTodos } = TodosListStore;
const todos = computed(() => TodosListStore.getTodos)
const pagination = computed(() => TodosListStore.getPagination)

const activeModalName = ref("");

type ModalSettings = {
  width: string;
  maxWidth: string;
  position: string;
};

const widthOptions: Ref<ModalSettings[]> = ref([
  {
    width: "100%",
    maxWidth: "500px",
    position: "left",
  },
  {
    width: "auto",
    maxWidth: "auto",
    position: "center",
  },
]);

const modalSettings = computed<ModalSettings>(() =>
  activeModalName.value === "remove-todo"
    ? widthOptions.value[1]
    : widthOptions.value[0]
);

const toggleModal = (modalName: string = "") => {
  activeModalName.value = modalName;
};

if (!pagination.value.listLength) {
  loadTodos()
}
</script>

<style lang="scss" scoped>
.todos-list {
  @apply grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 xl:gap-5;
}
</style>
