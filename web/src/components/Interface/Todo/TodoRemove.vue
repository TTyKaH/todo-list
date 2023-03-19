<template>
  <div class="remove-todo">
    <h3>Remove todo?</h3>
    <div class="actions">
      <CustomButton @click="close">Cancel</CustomButton>
      <CustomButton @click="removeTodo()">Remove</CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import api from "@/api";
import { useToggleLoader } from "@/composable/useToggleLoader.js";
import { useNotify } from "@/composable/useNotify.js";
import { useTodosListStore } from "@/stores/todos";

const emit = defineEmits<{
  (e: "close-modal"): void;
}>();

const { toggleLoader } = useToggleLoader();
const { showNotify } = useNotify();
const { getActiveTodo, loadTodos, setActiveTodoId } = useTodosListStore();

const activeTodo = ref(getActiveTodo);

const close = () => {
  emit("close-modal");
};

async function removeTodo() {
  toggleLoader(true);

  try {
    const response = await api.todo.removeTodo(activeTodo.value);

    await loadTodos();
    close();
    showNotify("success", response.message);
    // TODO: what to do with it?
  } catch (err: any) {
    showNotify("error", err.response.data.message);
  } finally {
    toggleLoader();
  }
}

onBeforeUnmount(() => {
  setActiveTodoId();
});
</script>

<style lang="scss" scoped>
.remove-todo {
  @apply flex flex-col gap-5;

  .actions {
    @apply flex gap-5;
  }
}
</style>
