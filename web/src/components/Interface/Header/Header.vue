<template>
  <div class="header">
    <div class="header__logo">Logo</div>
    <VueFeather type="log-out" @click="handleLogout" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useNotify } from "@/composable/useNotify.js";

const { logout } = useAuthStore();
const { showNotify } = useNotify();

const handleLogout = () => {
  logout();
  showNotify("success", "You have successfully logged out!");
};
</script>

<style lang="scss" scoped>
.header {
  @apply flex justify-between items-center py-4 px-7;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e7e7e7;
}
</style>
