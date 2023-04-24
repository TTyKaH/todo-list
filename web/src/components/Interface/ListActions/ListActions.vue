<template>
  <div class="list-actions">
    <div class="list-actions__actions">
      <TooltipWrapper tooltip="add todo">
        <!-- TODO: необходимо сбрасывать id активного todo -->
        <VueFeather
          type="plus-square"
          @click="toggleModal('create-todo')"
        />
      </TooltipWrapper>
    </div>
    <div class="list-actions__settings">
      <CustomInput
        v-model="search"
        label="Search"
        placeholder="Search"
        isSimple
      >
        <template v-slot:after>
          <VueFeather
            type="x"
            class="list-actions__clear-icon"
            @click="clearSearch"
          />
        </template>
      </CustomInput>
    </div>
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
import { ref, Ref, watch } from "vue";
import { useTodosListStore } from '@/stores/todos'
import TodoForm from "@/components/Interface/Todo/TodoForm/TodoForm.vue";

const { setListSetting } = useTodosListStore()

type ModalNames = "" | "create-todo";
const activeModalName: Ref<ModalNames> = ref("");

function toggleModal(modalName: ModalNames = "") {
  activeModalName.value = modalName;
}

const search = ref('')

watch(
  () => search.value,
  () => setListSetting('search', search.value),
)

const clearSearch = () => {
  search.value = ''
}
</script>

<style lang="scss" scoped>
.list-actions {
  @apply flex justify-between items-center p-3;
  background: var(--bg-draft);

  &__actions {
    @apply flex items-center;
  }

  &__settings {
    :deep(.custom-field) {
      .field {
        @apply pr-7;
      }
    }
  }

  &__clear-icon {
    @apply absolute right-1;
    top: calc(50% - 12px);
  }
}
</style>
