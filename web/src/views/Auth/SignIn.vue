<template>
  <div class="auth">
    <div class="form">
      <Logo center />
      <CustomInput v-model="formValue.username" label="Username" required />
      <CustomInput v-model="formValue.password" label="Password" required />
      <div class="actions">
        <RouterLink to="/auth/sign-up">To Sign-Up</RouterLink>
        <CustomButton @click="signIn">Sign-In</CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useToggleLoader } from "@/composable/useToggleLoader.js";
import { useNotify } from "@/composable/useNotify.js";
import Logo from "@/components/UI/Logo.vue";

const router = useRouter();
const auth = useAuthStore();
const { toggleLoader } = useToggleLoader();
const { showNotify } = useNotify();

onBeforeMount(() => {
  if (auth.status.loggedIn) {
    router.push({ name: "todo-list" });
  }
});

const formValue = ref({
  username: "",
  password: "",
});

const signIn = async () => {
  toggleLoader(true);
  try {
    await auth.login(formValue.value);
    router.push({ name: "todo-list" });
    showNotify("success", "Welcome!");
  } catch (err) {
    showNotify("error", err.response.data.message);
  } finally {
    toggleLoader();
  }
};
</script>