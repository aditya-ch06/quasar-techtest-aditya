<template>
  <component :is="currentComponent" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import AdminDashboardPage from './AdminDashboardPage.vue'
import UserDashboardPage from './UserDashboardPage.vue'

const auth = useAuthStore()

const currentComponent = computed(() => {
  if (auth.user?.role === 'admin') return AdminDashboardPage
  return UserDashboardPage
})
</script>
