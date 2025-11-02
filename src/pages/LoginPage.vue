<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg" style="min-width: 350px;">
      <q-card-section>
        <div class="text-h6 text-center">Login</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="handleLogin">
          <q-input
            filled
            v-model="username"
            label="Username"
            dense
            clearable
            class="q-mb-md"
          />
          <q-input
            filled
            v-model="password"
            label="Password"
            type="password"
            dense
            clearable
          />

          <div v-if="auth.error" class="text-negative text-caption q-mt-sm">
            {{ auth.error }}
          </div>

          <div class="q-mt-md">
            <q-btn
              label="Login"
              color="primary"
              type="submit"
              class="full-width"
              :loading="auth.loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'

const username = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

async function handleLogin() {
  const success = await auth.login(username.value, password.value)
  if (success) {
    await router.push('/')
  }
}
</script>
