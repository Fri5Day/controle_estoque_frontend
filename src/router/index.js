// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },

      {
        path: '/produto',
        name: 'Product',
        component: () => import('@/views/Product.vue'),
      },

      {
        path: '/transacao',
        name: 'Transaction',
        component: () => import('@/views/Transaction.vue'),
      },

      {
        path: '/ncm',
        name: 'Ncm',
        component: () => import('@/views/Ncm.vue'),
      },

      {
        path: '/entrada',
        name: 'Input',
        component: () => import('@/views/Input.vue'),
      },

      {
        path: '/saida',
        name: 'Output',
        component: () => import('@/views/Output.vue'),
      },

      {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'Home' },
      },

    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
