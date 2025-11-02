<template>
  <q-page class="q-pa-md">
    <q-breadcrumbs class="q-mb-md">
      <q-breadcrumbs-el label="Outlets" icon="storefront" to="/outlets" />
      <q-breadcrumbs-el :label="outlet?.name || 'Loading...'" icon="info" />
    </q-breadcrumbs>

    <div v-if="outlet" class="q-mb-lg">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">{{ outlet.name }}</div>
          <div class="text-subtitle2 text-grey">
            Wilayah: {{ outlet.location }}
          </div>
          <div class="text-subtitle2 text-grey">
            Status:
            <q-badge
              :color="outlet.status === 'Active' ? 'green' : 'grey'"
              class="q-ml-xs"
            >
              {{ outlet.status }}
            </q-badge>
          </div>
          <div class="text-subtitle2 text-grey">
            Sales: {{ outlet.salesName }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div>
      <div class="row items-center justify-between q-mb-sm">
        <div class="text-h6">Orders</div>
        <q-btn
          color="primary"
          label="New Order"
          icon="add"
          @click="showOrderForm = true"
        />
      </div>

      <q-table
        v-if="orders.length"
        :rows="orders"
        :columns="columns"
        row-key="id"
        flat
        bordered
        separator="horizontal"
      />

      <div v-else class="text-grey q-mt-md">
        No orders found for this outlet.
      </div>
    </div>

    <q-dialog v-model="showOrderForm" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Create New Order</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form @submit.prevent="addOrder">
            <q-input
              filled
              v-model="newOrderDate"
              label="Order Date"
              type="date"
              dense
              :rules="[val => !!val || 'Date is required']"
            />

            <div class="row justify-end q-gutter-sm q-mt-md">
              <q-btn flat label="Cancel" color="grey" v-close-popup />
              <q-btn
                label="Create"
                color="primary"
                type="submit"
                :disable="!newOrderDate"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter  } from 'vue-router'
import type { QTableColumn } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { useOutletsStore } from 'src/stores/outlets'
import { useOrdersStore } from 'src/stores/orders'

const route = useRoute()
const router = useRouter()

const auth = useAuthStore()
const outletStore = useOutletsStore()
const ordersStore = useOrdersStore()

const outletId = Number(route.params.id)
const showOrderForm = ref(false)
const newOrderDate = ref('')

const outlet = computed(() => outletStore.outlets.find(o => o.id === outletId))

const isAllowed = computed(() => {
  if (!auth.user) return false
  if (auth.user.role === 'admin') return true
  return outlet.value?.userId === auth.user.id
})

const orders = computed(() => ordersStore.getOrdersByOutlet(outletId))

const columns: QTableColumn[] = [
  { name: 'id', label: 'Order ID', field: 'id', align: 'left', sortable: true },
  { name: 'orderDate', label: 'Order Date', field: 'orderDate', align: 'left', sortable: true },
]

function addOrder() {
  if (!newOrderDate.value) return
  ordersStore.addOrder({
    orderDate: newOrderDate.value,
    outletId
  })
  showOrderForm.value = false
  newOrderDate.value = ''
}

onMounted(async () => {
  if (outletStore.outlets.length === 0) await outletStore.fetchOutlets()
  if (ordersStore.orders.length === 0) await ordersStore.fetchOrders()

  if (!isAllowed.value) {
    await router.push('/403')
  }
})
</script>

<style scoped>
.q-badge {
  font-weight: 500;
}
</style>
