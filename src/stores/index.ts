import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default function () {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  return pinia
}
