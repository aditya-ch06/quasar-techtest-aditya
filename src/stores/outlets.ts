import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import type { Outlet, User } from 'src/types/models'

export const useOutletsStore = defineStore('outlets', () => {
  const outlets = ref<Outlet[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const auth = useAuthStore()

  async function fetchOutlets() {
    loading.value = true
    error.value = null

    try {
      const [outletRes, userRes] = await Promise.all([
        fetch('/data/outlets.json'),
        fetch('/data/users.json')
      ])

      const [outletData, userData]: [Outlet[], User[]] = await Promise.all([
        outletRes.json(),
        userRes.json()
      ])

      outlets.value = outletData.map(o => {
        const user = userData.find(u => u.id === o.userId)
        return {
          ...o,
          salesName: user ? user.name : 'Unknown'
        }
      })
    } catch (err) {
      console.error('Error fetching outlets:', err)
      error.value = 'Failed to load outlets'
    } finally {
      loading.value = false
    }
  }

  const filteredOutlets = computed(() => {
    if (!auth.user) return []
    if (auth.user.role === 'admin') return outlets.value
    return outlets.value.filter(o => o.userId === auth.user?.id)
  })

  return {
    outlets,
    loading,
    error,
    fetchOutlets,
    filteredOutlets,
  }
})
