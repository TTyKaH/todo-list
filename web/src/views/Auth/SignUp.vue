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
        v-model="v$.email.$model"
        :hasError="v$.email.$error"
        :errorMessage="v$.email.$errors?.[0]?.$message"
        label="Email"
        required
        @blur="v$.email.$touch()"
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
      <CustomInput
        v-model="v$.confirmPassword.$model"
        :hasError="v$.confirmPassword.$error"
        :errorMessage="v$.confirmPassword.$errors?.[0]?.$message"
        type="password"
        label="Repeat password"
        required
        @blur="v$.confirmPassword.$touch()"
      />
      <div class="actions">
        <RouterLink to="/auth/sign-in">To Sign-In</RouterLink>
        <CustomButton
          @click="signUp"
          :isDisabled="!isFormCorrect"
        >Sign-Up</CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useToggleLoader } from "@/composable/useToggleLoader.js";
import { useNotify } from "@/composable/useNotify.js";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, alphaNum, email } from '@vuelidate/validators'
import Logo from "@/components/UI/Logo.vue";

const auth = useAuthStore();
const router = useRouter();
const { toggleLoader } = useToggleLoader();
const { showNotify } = useNotify();

const formValues = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
});

const isEqual = (compareTo: string): any => {
  return (val: any, vm: any) => val === vm[compareTo]
}

const rules = {
  username: { required, minLength: helpers.withMessage('Minimal length 3', minLength(3)), maxLength: helpers.withMessage('Maximal length 20', maxLength(20)) },
  email: { required, email },
  password: { required, alphaNum, minLength: helpers.withMessage('Minimal length 8', minLength(8)), maxLength: helpers.withMessage('Maximal length 20', maxLength(20)) },
  confirmPassword: { required, isEqual: helpers.withMessage('Passwords must be equal', isEqual('password')) }
}

const v$ = useVuelidate(rules, formValues)

const isFormCorrect = computed(() => !v$.value.$error && !v$.value.$errors.length && v$.value.$anyDirty)

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