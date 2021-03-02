import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import A from '../views/A.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/test',
    name: 'A',
    component: A,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
