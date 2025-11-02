import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from 'src/types/models'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function login(username: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      // Simulate API call to fetch users
      const res = await fetch('/data/users.json')
      const users: User[] = await res.json()

      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      )

      if (foundUser) {
        user.value = { ...foundUser }
        isAuthenticated.value = true
        return true
      } else {
        error.value = 'Invalid username or password'
        user.value = null
        isAuthenticated.value = false
        return false
      }
    } catch (err) {
      console.error('Login error:', err)
      error.value = 'Failed to connect to server'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  }
}, {
  persist: {
    key: 'auth',
    storage: localStorage,
  },
})
