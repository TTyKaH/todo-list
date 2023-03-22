<template>
  <div class="auth">
    <div class="form">
      <CustomInput
        v-model="formValue.username"
        label="Username"
        required
      />
      <CustomInput
        v-model="formValue.password"
        label="Password"
        required
      />
      <div class="actions">
        <CustomButton>To Sign-Up</CustomButton>
        <CustomButton @click="signIn">Sign-In</CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount  } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const auth = useAuthStore()

onBeforeMount(() => {
  if (auth.status.loggedIn) {
    // TODO: uncomment in future
    // router.push({name: 'todo-list'})
  }
})

const formValue = ref({
  username: '',
  password: '',
})

const signIn = async () => {
  auth.login(formValue.value)
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