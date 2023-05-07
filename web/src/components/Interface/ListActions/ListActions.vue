<template>
  <div class="list-actions">
    <div class="list-actions__create">
      <TooltipWrapper tooltip="add todo">
        <!-- TODO: необходимо сбрасывать id активного todo -->
        <VueFeather type="plus-square" @click="toggleModal('create-todo')" />
      </TooltipWrapper>
    </div>
    <ListSettings />
    <ModalWindow :isShow="activeModalName === 'create-todo'" modalType="left" maxWidth="500px" width="100%"
      @close="toggleModal">
      <TodoForm @close-modal="toggleModal" />
    </ModalWindow>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import TodoForm from "@/components/Interface/Todo/TodoForm/TodoForm.vue";
import ListSettings from "@/components/Interface/ListActions/ListSettings.vue";

type ModalNames = "" | "create-todo";
const activeModalName: Ref<ModalNames> = ref("");

function toggleModal(modalName: ModalNames = "") {
  activeModalName.value = modalName;
}
</script>

<style lang="scss" scoped>
.list-actions {
  @apply flex flex-wrap gap-3 items-center py-3 px-2 justify-between md:flex-nowrap;
  background: var(--bg-second-layer);
  box-shadow: 0px 1px 8px -4px var(--shadow);

  &__create {
    @apply flex items-center w-6;
  }
}
</style>
