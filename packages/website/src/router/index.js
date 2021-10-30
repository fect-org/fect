import { createRouter, createWebHistory } from 'vue-router'
const path = import.meta.globEager('../../docs/zh-cn/components/*.md')
const guide = import.meta.globEager('../../docs/zh-cn/guide/*.md')

const FECT_TITLE = 'Vue - Fect UI'

const collectRoute = (context) => {
  return Object.keys(context).map((p) => {
    const sourceName = p.match(/\w+(?=.md)/g).toString()
    const routeName = sourceName.charAt(0).toUpperCase() + sourceName.slice(1)
    return {
      path: routeName.toLowerCase(),
      name: routeName,
      component: context[p].default,
      meta: {
        title: `${routeName} | ${FECT_TITLE}`,
      },
    }
  })
}

const routes = [
  { path: '/', redirect: { path: '/zh-cn' } },
  {
    path: '/zh-cn',
    component: () => import('../components/layout/home.vue'),
    meta: {
      title: FECT_TITLE,
    },
  },
  {
    path: '/zh-cn/components',
    component: () => import('../components/layout/layout.vue'),
    children: [...collectRoute(path)],
  },
  {
    path: '/zh-cn/guide',
    component: () => import('../components/layout/layout.vue'),
    children: [...collectRoute(guide)],
  },
]

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
