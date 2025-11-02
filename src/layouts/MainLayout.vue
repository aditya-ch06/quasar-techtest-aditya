<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>Manajemen Penjualan</q-toolbar-title>
        <q-btn flat dense round icon="brightness_6" @click="toggleDark" />
        <q-btn flat dense round icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered>
      <div class="q-pa-md flex flex-col items-center user-info">
        <q-avatar size="64px" class="q-my-sm">
          <img src="https://placehold.co/100x100" alt="User Avatar" />
        </q-avatar>

        <div class="user-text">
          <div class="text-weight-medium text-body1">{{ auth.user?.name }}</div>
          <div class="text-caption text-grey-7">{{ auth.user?.username }}</div>
        </div>
      </div>
      
      <q-separator spaced />

      <q-list padding>
        <q-item
          v-for="link in menuItems"
          :key="link.label"
          clickable
          tag="router-link"
          :to="link.to"
          :exact="link.exact"
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>{{ link.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const auth = useAuthStore()
const leftDrawerOpen = ref(false)

const menuItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/', exact: true },
  { label: 'Outlets', icon: 'store', to: '/outlets', exact: false },
]

function toggleDark() {
  $q.dark.toggle()
}

async function logout() {
  auth.logout()
  await router.push('/login')
}
</script>

<style scoped>
.user-info {
  text-align: left;
  gap: 0.5rem; /* Adds spacing between children (avatar and text block) */
}

.user-text {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 0.25rem; /* Adds space between name and ID */
}

</style>
