<template>
  <div class="list-actions">
    <div class="actions">
      <TooltipWrapper tooltip="add todo">
        <VueFeather type="plus-square" @click="toggleModal('create-todo')" />
      </TooltipWrapper>
    </div>
    <div>Table settings</div>
    <ModalWindow v-if="activeModalName === 'create-todo'" @close="toggleModal">
      <CreateTodoForm @close-modal="toggleModal" />
    </ModalWindow>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ModalWindow from "@/components/UI/modals/ModalWindowComponent.vue";
import CreateTodoForm from "@/components/Interface/Forms/CreateTodoFormComponent.vue";

const activeModalName = ref("");

function toggleModal(modalName = "") {
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
}
</style>
