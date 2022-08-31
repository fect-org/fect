/**
 * Load all markdown files in the directory.
 * and record that tree relationship.
 */

import { createRouter as createVueRouter } from 'vue-router'
import { Home } from '../components/home'
import { Wrap } from '../components/wrap'

import type { RouteRecordRaw, RouterHistory } from 'vue-router'
import type { StaticModule } from './loader'

interface RouterOptions {
  routes: RouteRecordRaw[]
  histroy: RouterHistory
}

export const createRouter = (options: RouterOptions) => {
  return createVueRouter({
    routes: options.routes,
    history: options.histroy
  })
}

export const traverse = (
  entry: StaticModule[],
  key: Exclude<keyof StaticModule, 'module'> = 'dirName'
): Array<{
  group: string
  children: StaticModule[]
}> => {
  const keys = {}
  const result = []
  entry.forEach((item) => {
    const parentGroup = item[key]
    const children = entry.filter((self) => self[key] === parentGroup).sort((a, b) => a.index - b.index)
    if (!keys[parentGroup]) {
      keys[parentGroup] = parentGroup
      result.push({
        group: parentGroup,
        children
      })
    }
  })
  return result
}

export const combinedRoutes = (module: Array<StaticModule[]>) => {
  const [zh, en] = module

  const basicRoute: RouteRecordRaw[] = [
    {
      path: '/',
      redirect: {
        path: '/en-us'
      }
    },
    {
      path: '/en-us',
      component: Home
    },
    {
      path: '/zh-cn',
      component: Home
    }
  ]

  const setter = (basePath: string, baseRoute: RouteRecordRaw[], module: ReturnType<typeof traverse>) => {
    module.forEach(({ group, children }) => {
      baseRoute.push({
        path: `/${basePath}/${group}`,
        component: Wrap,
        children: children.map((item) => {
          const { group, title, name, module } = item
          return {
            path: name.toLowerCase(),
            component: module,
            meta: {
              title,
              group
            }
          }
        })
      })
    })
  }

  setter('zh-cn', basicRoute, traverse(zh))
  setter('en-us', basicRoute, traverse(en))
  return {
    routes: basicRoute
  }
}
