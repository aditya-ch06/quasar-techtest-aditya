<template>
  <q-page padding>
    <div class="text-h5 q-my-lg q-mx-md">
      Welcome to Admin Dashboard, {{ auth.user?.name }}
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <div class="text-h6 q-mb-sm">Total Orders by Location</div>
          <canvas ref="outletChart"></canvas>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Chart, type ChartConfiguration, registerables } from 'chart.js'
import { useAuthStore } from '../stores/auth'
import type { Outlet } from 'src/types/models'

const auth = useAuthStore()
const outletChart = ref<HTMLCanvasElement | null>(null)

Chart.register(...registerables)

async function fetchOutlets() {
  const response = await fetch('/data/outlets.json')
  return await response.json()
}

onMounted(async () => {
  const outlets = await fetchOutlets()

  const grouped: Record<string, number> = outlets.reduce((acc: Record<string, number>, outlet: Outlet) => {
    acc[outlet.location] = (acc[outlet.location] || 0) + outlet.total
    return acc
  }, {} as Record<string, number>)

  const labels = Object.keys(grouped)
  const values = Object.values(grouped) 

  const ctx = outletChart.value?.getContext('2d')
  if (!ctx) return

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Total Orders',
          data: values,
          backgroundColor: 'rgba(63, 81, 181, 0.7)',
          borderColor: '#3f51b5',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Total Orders by Location',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 },
        },
      },
    },
  }

  new Chart(ctx, config)
})
</script>

<style scoped>
.q-page {
  background: var(--q-color-grey-1);
}
</style>
