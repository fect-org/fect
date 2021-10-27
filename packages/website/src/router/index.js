import { createRouter, createWebHistory } from 'vue-router'
const path = import.meta.globEager('../../docs/zh-cn/**/*.md')

const collectRoute = (context) => {
  return Object.keys(context).map((p) => {
    const sourceName = p.match(/\w+(?=.md)/g).toString()
    const routeName = sourceName.charAt(0).toUpperCase() + sourceName.slice(1)
    return {
      path: routeName.toLowerCase(),
      name: routeName,
      component: () => context[p],
    }
  })
}
// redirect: { name: 'Introduce' }
const routes = [
  { path: '/', redirect: { path: '/zh-cn' } },
  {
    path: '/zh-cn',
    component: () => import('../components/layout/home.vue'),
  },
  {
    path: '/zh-cn/components',
    component: () => import('../components/layout/layout.vue'),
    children: [...collectRoute(path)],
  },
]

console.log(routes)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
})

function scrollBehavior(to, from, savedPosition) {
  window.scrollTo(0, 0)
}

export default router
