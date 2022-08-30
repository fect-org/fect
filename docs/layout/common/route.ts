/**
 * Load all markdown files in the directory.
 * and record that tree relationship.
 */

import { createRouter as createVueRouter } from 'vue-router'
import { Home } from '../components/home'
import { Wrap } from '../components/wrap'

import type { RouteRecordRaw, RouterHistory } from 'vue-router'
import { flatMarkdownModule, loadStaticMarkdownModule, ModuleInfo, StaticModule } from './loader'

export const markdownModule = loadStaticMarkdownModule()

const convert = (enrty: Map<unknown, unknown>) => {
  return Object.fromEntries(Array.from(enrty.entries(), ([k, v]) => (v instanceof Map ? [k, convert(v)] : [k, v])))
}

const serializeModule = (module: typeof markdownModule) => {
  const { zhModule, enModule } = module

  const all = [convert(zhModule), convert(enModule)] as Array<Record<string, Record<string, Array<ModuleInfo>>>>

  for (const each of all) {
    Object.values(each).forEach((val) => {
      for (const key in val) {
        val[key] = val[key].sort((a, b) => a.index - b.index)
      }
    })
  }

  return all
}

export const flatModule = flatMarkdownModule(markdownModule)
export const serializedModule = serializeModule(markdownModule)

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

const traverse = (
  entry: StaticModule[]
): Array<{
  group: string
  children: StaticModule[]
}> => {
  const keys = {}
  const result = []
  entry.forEach((item) => {
    const { dirName: parentGroup } = item
    const children = entry.filter((self) => self.dirName === parentGroup)
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
  return basicRoute
}
