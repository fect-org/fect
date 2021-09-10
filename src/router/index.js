import { createRouter, createWebHistory } from 'vue-router'
const path = require.context('../../docs/zh-cn', true, /.md$/)

const collectRoute = (context) => {
  return context.keys().map((p) => {
    const sourceName = p.match(/\w+(?=.md)/g).toString()
    const routeName = sourceName.charAt(0).toUpperCase() + sourceName.slice(1)
    return {
      path: `/${routeName}`,
      name: routeName,
      component: context(p).default,
    }
  })
}

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
