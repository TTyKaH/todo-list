<template>
  <div class="header">
    <Logo />
    <div class="header__menu">
      <template v-if="!isMobile">
        <ThemeToggler />
        <VueFeather type="log-out" @click="handleLogout" />
      </template>
      <VueFeather v-if="isMobile" type="menu" @click="toggleMenu" />
    </div>
    <ModalWindow :isShow="isOpenBurgerMenu">
      <BurgerMenu @close="isOpenBurgerMenu = false" />
    </ModalWindow>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useNotify } from "@/composable/useNotify";
import { useWindowChecker } from "@/composable/useWindowChecker";
import ThemeToggler from "@/components/Interface/ThemeToggler.vue";
import BurgerMenu from "@/components/Interface/Header/BurgerMenu.vue";
import Logo from "@/components/UI/Logo.vue";

const { logout } = useAuthStore();
const { showNotify } = useNotify();
const { isMobile } = useWindowChecker();

const handleLogout = () => {
  logout();
  showNotify("success", "You have successfully logged out!");
};

const isOpenBurgerMenu = ref(false);

const toggleMenu = () => {
  isOpenBurgerMenu.value = !isOpenBurgerMenu.value;
};

watch(
  () => isMobile.value,
  () => {
    if (!isMobile.value) {
      isOpenBurgerMenu.value = false;
    }
  }
);
</script>

<style lang="scss" scoped>
.header {
  @apply flex z-10 justify-between items-center py-4 px-2 md:px-4 lg:px-7;
  background-color: var(--bg-second-layer);
  border-bottom: 1px solid var(--border);
  box-shadow: 0px -18px 16px 12px var(--shadow);

  &__menu {
    @apply flex gap-4;
  }
}
</style>
