<template>
  <div class="auth">
    <div class="form">
      <CustomInput
        v-model="formValues.username"
        label="Username"
        required
      />
      <CustomInput
        v-model="formValues.password"
        label="Password"
        required
      />
      <CustomInput
        v-model="formValues.email"
        label="Email"
        required
      />
      <div class="actions">
        <CustomButton>To Sign-In</CustomButton>
        <CustomButton @click="signUp">Sign-Up</CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

const auth = useAuthStore()

const formValues = ref({
  username: '',
  password: '',
  email: ''
})

const signUp = async () => {
  await auth.register(formValues.value)
  // TODO: move to utilities?
  if (auth.status.loggedIn) {
    // TODO: uncomment in future or change logic
    // router.push({name: 'todo-list'})
  }
}
</script>

<style lang="scss" scoped>
.sign-in {}
</style>