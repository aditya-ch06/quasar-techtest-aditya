import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DashboardRouter.vue') },
    ],
  },
  {
    path: '/outlets',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/OutletsPage.vue') },
      { path: ':id', component: () => import('pages/OutletDetailPage.vue') }
    ]
  },
  {
    path: '/403',
    component: () => import('pages/ForbiddenPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/NotFoundPage.vue'),
  },
]

export default routes
