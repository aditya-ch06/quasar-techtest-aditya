// tests/setup.ts

import { vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { ref } from 'vue'

// 1. Initialize Pinia
// This makes a Pinia instance available to all tests
setActivePinia(createPinia())

// 2. Mock vue-router
// We create a mock 'push' function to spy on
export const mockRouterPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}))

// 3. Mock the auth store
// We create a mock store object that our tests can control
export const mockAuthStore = {
  login: vi.fn(),
  error: ref<string | null>(null),
  loading: ref<boolean>(false),
}
vi.mock('src/stores/auth', () => ({
  useAuthStore: () => mockAuthStore,
}))

// 4. Global cleanup
// Reset all mocks before each test to ensure isolation
beforeEach(() => {
  mockRouterPush.mockClear()
  mockAuthStore.login.mockClear()
  mockAuthStore.error.value = null
  mockAuthStore.loading.value = false
})

// // tests/setup.ts
// import { config } from '@vue/test-utils'
// import { beforeEach } from 'vitest'
// import { setActivePinia, createPinia } from 'pinia'

// // Automatically create a new Pinia instance before each test
// beforeEach(() => {
//   setActivePinia(createPinia())
// })

// // Optional: Global mocks
// config.global.mocks = {
//   $t: (msg: string) => msg, // if using i18n
// }

// // Optional: Stub Quasar components (to avoid rendering complexity)
// // config.global.stubs = {
// //   transition: false,
// //   'q-page': true,
// //   'q-card': true,
// //   'q-btn': true,
// //   'q-input': true,
// //   'q-icon': true,
// //   'q-table': true,
// //   'q-avatar': true,
// //   'q-list': true,
// //   'q-item': true,
// //   'q-item-section': true,
// // }
