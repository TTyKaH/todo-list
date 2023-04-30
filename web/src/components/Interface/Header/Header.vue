<template>
  <div class="header">
    <div class="header__logo">Logo</div>
    <VueFeather type="log-out" @click="test" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const { logout } = useAuthStore();

const test = () => {
  logout();
};
</script>

<style lang="scss" scoped>
.header {
  @apply flex justify-between items-center py-4 px-7;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e7e7e7;
}
</style>
