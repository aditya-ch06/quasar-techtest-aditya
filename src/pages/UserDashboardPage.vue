<template>
  <q-page padding>
    <div class="text-h5 q-my-lg q-mx-md">
      Welcome to User Dashboard, {{ auth.user?.name }}
    </div>

    <div class="dashboard-grid">
      <div
        v-for="tile in tiles"
        :key="tile.path"
        class="dashboard-tile"
        @click="goTo(tile.path)"
      >
        <q-icon :name="tile.icon" size="80px" color="primary" />
        <div class="tile-label">{{ tile.label }}</div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const tiles = [
  { label: 'Outlets', icon: 'store', path: '/outlets' },
  { label: 'Orders', icon: 'receipt_long', path: '/orders' },
  { label: 'Profile', icon: 'account_circle', path: '/profile' },
]

async function goTo(path: string) {
  await router.push(path)
}
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.dashboard-tile {
  aspect-ratio: 1 / 1;
  background-color: var(--q-color-grey-2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-tile:hover {
  background-color: var(--q-color-grey-3);
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.tile-label {
  margin-top: 0.5rem;
  font-weight: 600;
  text-align: center;
}
</style>
