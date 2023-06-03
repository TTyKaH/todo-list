<template>
  <div class="auth">
    <div class="form">
      <Logo
        center
        class="mb-2"
      />
      <CustomInput
        v-model="v$.username.$model"
        :hasError="v$.username.$error"
        :errorMessage="v$.username.$errors?.[0]?.$message"
        label="Username"
        required
        @blur="v$.username.$touch()"
      />
      <CustomInput
        v-model="v$.password.$model"
        :hasError="v$.password.$error"
        :errorMessage="v$.password.$errors?.[0]?.$message"
        type="password"
        label="Password"
        required
        @blur="v$.password.$touch()"
      />
      <div class="actions">
        <RouterLink to="/auth/sign-up">To Sign-Up</RouterLink>
        <CustomButton
          @click="signIn"
          :isDisabled="!isFormCorrect"
        >Sign-In</CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useToggleLoader } from "@/composable/useToggleLoader.js";
import { useNotify } from "@/composable/useNotify.js";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
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

const formValues = ref({
  username: "",
  password: "",
});

const rules = {
  username: { required },
  password: { required },
}

const v$ = useVuelidate(rules, formValues)

const isFormCorrect = computed(() => !v$.value.$error && !v$.value.$errors.length && v$.value.$anyDirty)

const signIn = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  toggleLoader(true);
  try {
    await auth.login(formValues.value);
    router.push({ name: "todo-list" });
    showNotify("success", "Welcome!");
  } catch (err) {
    showNotify("error", err.response.data.message);
  } finally {
    toggleLoader();
  }
};
</script>