import { createRouter, createWebHistory } from 'vue-router'
import { zhRoutes } from './zh-cn'
import { enRoutes } from './en-us'

const routes = [{ path: '/', redirect: { path: '/zh-cn' } }, ...zhRoutes, ...enRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title
  next()
})

function scrollBehavior(to, from, savedPosition) {
  window.scrollTo(0, 0)
}

export default router
