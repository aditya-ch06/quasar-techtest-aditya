import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order } from 'src/types/models'

export const useOrdersStore = defineStore('orders', () => {
  
  const orders = ref<Order[]>([])
  const loading = ref(false)
  const error =  ref<string | null>(null)
  
  async function fetchOrders() {
    loading.value = true
    error.value = ''
    try {
      const response = await fetch('/data/orders.json')
      if (!response.ok) throw new Error('Failed to fetch orders')
      const data = await response.json()
      orders.value = data
    } catch (err) {
      error.value = (err as Error).message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  function addOrder(order: Omit<Order, 'id'>) {
    const newId = orders.value.length
      ? Math.max(...orders.value.map(o => o.id)) + 1
      : 1
    const newOrder = { id: newId, ...order }
    orders.value.push(newOrder)
  }

  function getOrdersByOutlet(outletId: number) {
    return orders.value.filter(o => o.outletId === outletId)
  }
  
  return {
    orders,
    loading,
    error,
    fetchOrders,
    addOrder,
    getOrdersByOutlet
  }
})
