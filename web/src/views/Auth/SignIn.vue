<template>
  <div class="auth">
    <div class="form">
      <CustomInput v-model="formValue.username" label="Username" required />
      <CustomInput v-model="formValue.password" label="Password" required />
      <div class="actions">
        <CustomButton link="/auth/sign-up">To Sign-Up</CustomButton>
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