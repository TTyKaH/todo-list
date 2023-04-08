<template>
  <div class="list-actions">
    <div class="actions">
      <TooltipWrapper tooltip="add todo">
        <!-- TODO: необходимо сбрасывать id активного todo -->
        <VueFeather
          type="plus-square"
          @click="toggleModal('create-todo')"
        />
      </TooltipWrapper>
    </div>
    <div>Table settings</div>
    <ModalWindow
      :isShow="activeModalName === 'create-todo'"
      modalType="left"
      maxWidth="500px"
      width="100%"
      @close="toggleModal"
    >
      <TodoForm @close-modal="toggleModal" />
    </ModalWindow>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import TodoForm from "@/components/Interface/Todo/TodoForm/TodoForm.vue";

type ModalNames = "" | "create-todo";
const activeModalName: Ref<ModalNames> = ref("");

function toggleModal(modalName: ModalNames = "") {
  activeModalName.value = modalName;
}
</script>

<style lang="scss" scoped>
.list-actions {
  @apply flex justify-between items-center p-3;
  background: var(--bg-draft);

  .actions {
    @apply flex items-center;
  }
}</style>
