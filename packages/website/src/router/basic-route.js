const FECT_TITLE = 'Vue - Fect UI'

export const collectRoute = (context) => {
  return Object.keys(context).map((p) => {
    const sourceName = p.match(/\w+(?=.md)/g).toString()
    const routeName = sourceName.charAt(0).toUpperCase() + sourceName.slice(1)
    return {
      path: routeName.toLowerCase(),
      // name: routeName,
      component: context[p].default,
      meta: {
        title: `${routeName} | ${FECT_TITLE}`,
      },
    }
  })
}

export const RouteTempalte = (components, guide, lang = 'zh-cn') => [
  {
    path: `/${lang}`,
    component: () => import('../components/layout/home.vue'),
    meta: {
      title: FECT_TITLE,
    },
  },
  {
    path: `/${lang}/components`,
    component: () => import('../components/layout/layout.vue'),
    children: components,
  },
  {
    path: `/${lang}/guide`,
    component: () => import('../components/layout/layout.vue'),
    children: guide,
  },
]
