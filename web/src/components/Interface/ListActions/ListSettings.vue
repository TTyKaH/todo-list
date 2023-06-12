<template>
  <div class="list-settings">
    <CustomSelect
      v-model="priorityId"
      :options="priorities"
      label="Priority"
      placeholder="Search by priority"
      optionTextKey="value"
      hideMargin
    />
    <CustomInput
      v-model="search"
      label="Search"
      placeholder="Search by title or description"
      hideMargin
    >
      <template v-slot:icon>
        <VueFeather
          v-if="isShowClearButton"
          type="x"
          class="list-settings__clear-icon"
          @click="clearSearch"
        />
      </template>
    </CustomInput>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { PRIORITIES } from "@/constants/index";
import { useTodosListStore } from "@/stores/todos";
import lodash from "lodash";

const { setListSetting } = useTodosListStore();

const priorities = [
  {
    id: null,
    value: "-",
  },
  ...PRIORITIES,
];

const search = ref("");
const priorityId = ref(null);

const isShowClearButton = computed(() => !!search.value.length);
watch(
  () => search.value,
  () => lodash.debounce(setListSetting("search", search.value), 500)
);

watch(
  () => priorityId.value,
  () => setListSetting("priorityId", priorityId.value)
);

const clearSearch = () => {
  search.value = "";
};
</script>

<style lang="scss" scoped>
.list-settings {
  @apply flex gap-2 self-start w-full md:flex-nowrap md:self-auto md:w-auto;

  :deep(.custom-field) {
    .field {
      @apply pr-7;
      min-width: 255px;
    }
  }

  &__clear-icon {
    @apply absolute right-1;
    top: calc(50% - 12px);
  }

  @media (max-width: 767px) {
    @apply flex-wrap self-start;
  }
}
</style>