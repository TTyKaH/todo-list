<template>
  <div class="pagination">
    <div class="pagination__list" v-if="isShowPagination">
      <template v-for="(page, idx) in pages" :key="idx">
        <CustomButton v-if="page.type === 'button'" class="pagination__item"
          :class="{ pagination__active: page.value === pagination.page }" @click="setCurrentPage(page.value)">
          {{ page.value }}
        </CustomButton>
        <div v-else>...</div>
      </template>
    </div>
    <label class="pagination__page-select">
      Per page:
      <select name="" id="" v-model="perPage">
        <option v-for="(item, idx) in perPageOptions" :key="idx" :value="item.value">
          {{ item.value }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import type { ComputedRef } from "vue";
import type { Pagination } from "@/types/ui/pagination";
import { useTodosListStore } from "@/stores/todos";
import { useWindowChecker } from "@/composable/useWindowChecker";
import { PER_PAGE_OPTIONS, PER_PAGE_OPTIONS_LARGE } from "@/constants/index";

const todosListStore = useTodosListStore();
const pagination: ComputedRef<Pagination> = computed(() => todosListStore.getPagination);

const page = computed(() => pagination.value.page);
const perPage = computed({
  get: () => pagination.value.perPage,
  set: (value) => setPaginationSetting("perPage", value),
});
const listLength = computed(() => pagination.value.listLength);
const setPaginationSetting = todosListStore.setPaginationSetting;

const { isMobile, isLargeDesktop } = useWindowChecker();

const perPageOptions = computed(() =>
  isLargeDesktop.value ? PER_PAGE_OPTIONS_LARGE : PER_PAGE_OPTIONS
);

watch(
  () => isLargeDesktop.value,
  () => {
    setPaginationSetting("perPage", isLargeDesktop.value ? 12 : 6);
  }
);

watch(
  () => page.value,
  () => setPaginationSetting("page", page.value)
);

const maxPagesBySide = computed(() => (isMobile.value ? 3 : 4));
const lastPage = computed(() => Math.ceil(listLength.value / perPage.value));

const generatePageButton = (page: number) => {
  return {
    type: "button",
    value: page,
  };
};

const pages = computed(() => {
  const preparedPages = [];

  // add current page
  preparedPages.push(generatePageButton(page.value));

  // add pages before current page
  for (
    let i = page.value - 1;
    i >= page.value - maxPagesBySide.value && i > 0;
    i--
  ) {
    preparedPages.unshift(generatePageButton(i));
  }

  // add pages after current page
  for (
    let j = page.value + 1;
    j < page.value + maxPagesBySide.value + 1 && j <= lastPage.value;
    j++
  ) {
    preparedPages.push(generatePageButton(j));
  }

  // add first page with dots
  if (page.value - (maxPagesBySide.value + 2) >= 0) {
    if (page.value - (maxPagesBySide.value + 2) >= 1) {
      preparedPages.unshift({
        type: "dots",
        value: 0,
      });
    }
    preparedPages.unshift(generatePageButton(1));
  }

  // add last page with dots
  if (page.value + maxPagesBySide.value < lastPage.value) {
    if (page.value + maxPagesBySide.value < lastPage.value - 1) {
      preparedPages.push({
        type: "dots",
        value: 0,
      });
    }
    preparedPages.push(generatePageButton(lastPage.value));
  }

  return preparedPages;
});

const isShowPagination = computed(() => pages.value.length > 1);

const setCurrentPage = (page: number) => {
  setPaginationSetting("page", page);
};
</script>

<style lang="scss" scoped>
.pagination {
  @apply flex flex-col justify-center items-center gap-5 md:flex-row;

  &__list {
    @apply flex items-end gap-1;
  }

  &__item {
    :deep(.custom-button) {
      padding: 2px 5px !important;
      background: var(--bg-second-layer);
    }
  }

  &__active {
    :deep(.custom-button) {
      background-color: var(--btn-bg-active) !important;
    }
  }

  &__page-select {
    @apply flex gap-1;
  }
}
</style>