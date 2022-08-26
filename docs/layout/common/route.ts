/**
 * Load all markdown files in the directory.
 * and record that tree relationship.
 */

import { createRouter, createWebHistory } from 'vue-router'
import { Home } from '../components/home'
import { Wrap } from '../components/wrap'

import type { RouteRecordRaw } from 'vue-router'
import { flatMarkdownModule, loadStaticMarkdownModule, ModuleInfo } from './loader'

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

const createRoute = () => {
  const routes: RouteRecordRaw[] = [
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

  const { zhModule, enModule } = markdownModule

  type ConvertModule = Record<string, Record<string, Array<ModuleInfo>>>

  const realZhModule = convert(zhModule) as ConvertModule
  const realEnModule = convert(enModule) as ConvertModule

  const registry = (belong: string, module: ConvertModule) => {
    Object.keys(module).forEach((group) => {
      const groupModule = module[group]

      const flatChildren = (val: typeof groupModule) =>
        Object.values(val).flatMap((r) => {
          return r.map(({ title, index, component, name }) => {
            return {
              path: name,
              component: component,
              meta: {
                title,
                index
              }
            }
          })
        })

      routes.push({
        path: `/${belong}/${group}`,
        component: Wrap,
        children: flatChildren(groupModule)
      })
    })
  }

  registry('zh-cn', realZhModule)
  registry('en-us', realEnModule)

  // Final we should set the not find for the routes
  routes.push({
    path: '/:error(.*)',
    component: {},
    meta: {
      async validate() {
        return Promise.reject('RenderError')
      }
    }
  })
  return routes
}

const router = createRouter({
  history: createWebHistory(),
  routes: createRoute()
})

export default router
