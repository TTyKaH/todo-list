<template>
  <div
    class="pagination"
    v-if="isShowPagination"
  >
    <div class="pagination__list">
      <template
        v-for="(page, idx) in pages"
        :key="idx"
      >
        <CustomButton
          v-if="page.type === 'button'"
          class="pagination__item"
          :class="{ 'pagination__active': page.value === pagination.page }"
          @click="setCurrentPage(page.value)"
        >
          {{ page.value }}
        </CustomButton>
        <div v-else>...</div>
      </template>
    </div>
    <!-- <CustomSelect
      v-model="perPage"
      :options="PER_PAGE_OPTIONS"
      optionTextKey="value"
      optionValueKey="value"
      label="Per page"
      class="pagination__page-select"
    /> -->
    <label class="pagination__page-select">
      Per page:
      <select
        name=""
        id=""
        v-model="perPage"
      >
        <option
          v-for="(item, idx) in PER_PAGE_OPTIONS"
          :key="idx"
          :value="item.value"
        >{{ item.value }}</option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Ref } from "vue";
import type { Pagination } from "@/types/ui/pagination";
import { useTodosListStore } from "@/stores/todos"
import { PER_PAGE_OPTIONS } from '@/constants/index'

const { getPagination, setPaginationSetting } = useTodosListStore();

const pagination: Ref<Pagination> = ref(getPagination)
const perPage: Ref<number> = ref(pagination.value.perPage)

watch(
  () => pagination.value.page,
  () => setPaginationSetting('page', pagination.value.page)
)

watch(
  () => perPage.value,
  () => setPaginationSetting('perPage', perPage.value)
)

const maxPagesBySide = 3
const lastPage = computed(() => Math.ceil(pagination.value.listLength / perPage.value))

const generatePageButton = (page: number) => {
  return {
    type: 'button',
    value: page
  }
}

const pages = computed(() => {
  const preparedPages = []

  // add current page
  preparedPages.push(generatePageButton(pagination.value.page))

  // add pages before current page
  for (let i = pagination.value.page - 1; i >= pagination.value.page - maxPagesBySide && i > 0; i--) {
    preparedPages.unshift(generatePageButton(i))
  }

  // add pages after current page
  for (let j = pagination.value.page + 1; j < (pagination.value.page + maxPagesBySide + 1) && j <= lastPage.value; j++) {
    preparedPages.push(generatePageButton(j))
  }

  // add first page with dots
  if (pagination.value.page - (maxPagesBySide + 2) >= 0) {
    if (pagination.value.page - (maxPagesBySide + 2) >= 1) {
      preparedPages.unshift(
        {
          type: 'dots',
          value: 0
        },
      )
    }
    preparedPages.unshift(
      generatePageButton(1)
    )
  }

  // add last page with dots
  if (pagination.value.page + maxPagesBySide < lastPage.value) {
    if (pagination.value.page + maxPagesBySide < lastPage.value - 1) {
      preparedPages.push(
        {
          type: 'dots',
          value: 0
        }
      )
    }
    preparedPages.push(
      generatePageButton(lastPage.value),
    )
  }

  return preparedPages
})

const isShowPagination = computed(() => pages.value.length > 1)

const setCurrentPage = (page: number) => {
  setPaginationSetting('page', page)
}
</script>

<style lang="scss" scoped>
.pagination {
  @apply flex justify-center items-center gap-5;

  &__list {
    @apply flex items-end gap-1;
  }

  &__item {
    padding: 2px 5px !important;
  }

  &__active {
    background-color: var(--bg-draft-second) !important;
  }

  &__page-select {
    @apply flex gap-1;
  }
}
</style>