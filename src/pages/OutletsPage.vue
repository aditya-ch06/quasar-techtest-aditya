<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Outlets</div>

      <div class="row q-gutter-sm items-center">
        <q-btn
          color="primary"
          label="Refresh"
          @click="outletsStore.fetchOutlets"
          :loading="outletsStore.loading"
        />

        <q-input
          dense
          outlined
          debounce="300"
          v-model="filter"
          placeholder="Search by outlet name..."
          class="w-64"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-select
          dense
          outlined
          v-model="selectedLocation"
          :options="locationOptions"
          emit-value
          map-options
          placeholder="Location"
          class="w-40"
        >
          <template #append>
            <q-icon name="place" />
          </template>
        </q-select>

        <div class="col-12 col-md-4" v-if="isAdmin">
          <q-select
            filled
            dense
            v-model="selectedSales"
            :options="salesOptions"
            label="Filter by Salesperson"
            clearable
          />
        </div>

        <q-select
          dense
          outlined
          v-model="selectedStatus"
          :options="statusOptions"
          emit-value
          map-options
          placeholder="Status"
          class="w-36"
        >
          <template #append>
            <q-icon name="filter_alt" />
          </template>
        </q-select>

        <q-btn
          dense
          flat
          color="primary"
          icon="clear"
          label="Clear"
          @click="clearFilters"
        />
      </div>
    </div>

    <q-table
      title="Outlets List"
      :rows="filteredOutlets"
      :columns="columns"
      row-key="id"
      :grid="isMobile"
      :flat="!isMobile"
      bordered
      separator="horizontal"
      :loading="outletsStore.loading"
      :rows-per-page-options="[5, 10, 20]"
    >
      <template v-slot:item="props">
        <q-card class="q-ma-xs grid-same">
          <q-card-section>
            <div class="text-subtitle1 text-bold">{{ props.row.name }}</div>
            <div class="text-body2"> {{ props.row.location }}</div>
            <div class="text-body2"> {{ props.row.salesName }}</div>
            <div class="text-body2"> Total Orders: {{ props.row.total }}</div>
            <div class="text-body2"> Status: {{ props.row.status }}</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              label="View Detail"
              color="primary"
              :to="`/outlets/${props.row.id}`"
            />
          </q-card-actions>
        </q-card>
      </template>

      <template #body-cell-name="props">
        <q-td :props="props">
          <router-link
            :to="`/outlets/${props.row.id}`"
            class="text-primary text-bold cursor-pointer"
          >
            {{ props.row.name }}
          </router-link>
        </q-td>
      </template>
      
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="props.row.status === 'Active' ? 'green' : 'grey'">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>
    </q-table>

    <div v-if="outletsStore.error" class="text-negative q-mt-md">
      {{ outletsStore.error }}
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { QTableColumn } from 'quasar'
import { useOutletsStore } from 'src/stores/outlets'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const isMobile = computed(() => $q.screen.lt.sm)

const outletsStore = useOutletsStore()
const auth = useAuthStore()

const filter = ref('')
const selectedLocation = ref<string | null>(null)
const selectedStatus = ref<string | null>(null)
const selectedSales = ref<{label: string, value: string} | null>(null)

const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'name', label: 'Nama Outlet', field: 'name', align: 'left', sortable: true },
  { name: 'location', label: 'Wilayah', field: 'location', align: 'left', sortable: true },
  { name: 'salesName', label: 'Nama Sales', field: 'salesName', align: 'left', sortable: true },
  { name: 'total', label: 'Total Order', field: 'total', align: 'left', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true }
]

const isAdmin = computed(() => auth.user?.role === 'admin')

const salesOptions = computed(() => {
  if (!isAdmin.value) return []
  const uniqueSales = Array.from(
    new Set(outletsStore.outlets.map(o => o.salesName))
  )
  return uniqueSales.map(name => ({ label: name, value: name }))
})

onMounted( async() => {
  await outletsStore.fetchOutlets()
})

const locationOptions = computed(() => {
  const uniqueLocations = Array.from(new Set(outletsStore.filteredOutlets.map(o => o.location)))
  return [{ label: 'All Locations', value: null }, ...uniqueLocations.map(loc => ({ label: loc, value: loc }))]
})

const statusOptions = [
  { label: 'All Statuses', value: null },
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' }
]

function clearFilters() {
  filter.value = ''
  selectedLocation.value = null
  selectedStatus.value = null
  selectedSales.value = null
}

const filteredOutlets = computed(() => {
  const keyword = filter.value.toLowerCase()

  return outletsStore.filteredOutlets.filter((outlet) => {
    const matchesName = !keyword || outlet.name.toLowerCase().includes(keyword)
    const matchesLocation =
      !selectedLocation.value || outlet.location === selectedLocation.value
    const matchesStatus =
      !selectedStatus.value || outlet.status === selectedStatus.value
    const matchesSales = !selectedSales.value || outlet.salesName?.trim() === selectedSales.value.value

    return matchesName && matchesLocation && matchesStatus && matchesSales
  })
})
</script>

<style scoped>
.w-64 {
  width: 16rem;
}
.w-40 {
  width: 10rem;
}
.w-36 {
  width: 9rem;
}

.grid-same {
  width: 520px;
}
</style>
