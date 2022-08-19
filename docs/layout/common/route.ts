import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/home/home.vue'

export const enum RouteName {
  Home = 'home',
  Guide = 'guide',
  Components = 'components',
  Composabls = 'composables'
}

export const routes = [
  //   {
  //     path: '/',
  //     redirect: {
  //       path: '/zh-cn'
  //     }
  //   },
  {
    path: '/',
    name: RouteName.Home,
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
