<template>
  <div class="list-actions">
    <div class="actions">
      <TooltipWrapper tooltip="add todo">
        <!-- TODO: необходимо сбрасывать id активного todo -->
        <VueFeather type="plus-square" @click="toggleModal('create-todo')" />
      </TooltipWrapper>
    </div>
    <div>Table settings</div>
    <ModalWindow v-if="activeModalName === 'create-todo'" @close="toggleModal">
      <TodoForm @close-modal="toggleModal" />
    </ModalWindow>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TodoForm from "@/components/Interface/Forms/TodoFormComponent.vue";

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
