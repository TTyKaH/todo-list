<template>
  <div class="list-actions">
    <div class="actions">
      <TooltipWrapper tooltip="add todo">
        <VueFeather
          type="plus-square"
          @click="toggleSideModal('create-todo')"
        />
      </TooltipWrapper>
    </div>
    <div>Table settings</div>
    <ModalWindow
      v-if="activeModalName === 'create-todo'"
      @close="toggleSideModal"
    >
      sssss
    </ModalWindow>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ModalWindow from "@/components/UI/modals/ModalWindowComponent.vue";

const activeModalName = ref("");

function toggleSideModal(modalName = "") {
  console.log("toggleSideModal");
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
