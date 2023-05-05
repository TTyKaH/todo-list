<template>
  <div class="auth">
    <div class="form">
      <CustomInput v-model="formValues.username" label="Username" required />
      <CustomInput v-model="formValues.password" label="Password" required />
      <CustomInput v-model="formValues.email" label="Email" required />
      <div class="actions">
        <CustomButton @click="signUp">Sign-Up</CustomButton>
        <RouterLink to="/auth/sign-in">To Sign-In</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useToggleLoader } from "@/composable/useToggleLoader.js";
import { useNotify } from "@/composable/useNotify.js";

const auth = useAuthStore();
const router = useRouter();
const { toggleLoader } = useToggleLoader();
const { showNotify } = useNotify();

const formValues = ref({
  username: "",
  password: "",
  email: "",
});

const signUp = async () => {
  toggleLoader(true);
  try {
    const response = await auth.register(formValues.value);
    showNotify("success", response.message);
    router.push({ name: "sign-in" });
  } catch (err) {
    showNotify("error", err.response.data.message);
  } finally {
    toggleLoader();
  }
};
</script>