import { createRouter, createWebHistory } from 'vue-router'
import { collectRoute } from '../../scripts/collectRouter'
// const path = require.context('../../docs/zh-cn/', true, /.md$/)
const path = require.context('../../docs/zh-cn', true, /.md$/)

collectRoute(path)

const routes = [
  { path: '/', redirect: { name: 'Introduce' } },
  ...collectRoute(path),
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
})

function scrollBehavior(to, from, savedPosition) {
  window.scrollTo(0, 0)
}

export default router
