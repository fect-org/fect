import { createRouter, createWebHistory } from 'vue-router'
const path = import.meta.globEager('../../docs/zh-cn/**/*.md')

const collectRoute = (context) => {
  return Object.keys(context).map((p) => {
    const sourceName = p.match(/\w+(?=.md)/g).toString()
    const routeName = sourceName.charAt(0).toUpperCase() + sourceName.slice(1)
    return {
      path: `/${routeName}`,
      name: routeName,
      component: () => context[p],
    }
  })
}

const routes = [{ path: '/', redirect: { name: 'Introduce' } }, ...collectRoute(path)]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
})

function scrollBehavior(to, from, savedPosition) {
  window.scrollTo(0, 0)
}

export default router
