/**
 * From https://github.com/vitejs/vite/issues/5558
 * we can't use a static variable to save the base path.
 * So we should export  a function to load the static source.
 * That is a tips: import.meta.glob is base on fast-glob
 * if you want to modify or perf the logic. you can view
 * the doc.
 */

import type { ModuleNamespace } from 'vite/types/hot'
import type { OrignalFrontMatter } from './front-matter'
import path from './path'

/**
 * we should use eager to get frontmatter from markdown
 */

// extends OrignalFrontMatter
export interface ModuleInfo extends Pick<OrignalFrontMatter, 'index' | 'title' | 'name' | 'group'> {
  component: ModuleNamespace
}

interface ModuleResult {
  default: ModuleNamespace
  frontmatter: OrignalFrontMatter
}

export interface StaticModule {
  title: string
  index: number
  name: string
  group: string
  dirName: string
  module: () => Promise<ModuleResult>
}

export const loadStaticMarkdownModuleAsync = () => {
  const zh = import.meta.glob<ModuleResult>('../../zh-cn/**/*.md')
  const en = import.meta.glob<ModuleResult>('../../en-us/**/*.md')
  const serialization = async (modules: Record<string, () => Promise<ModuleResult>>) => {
    return Promise.all(
      Object.entries(modules).map(async ([filePath, module]) => {
        const {
          frontmatter: { title, index, name, group }
        } = await module()
        const dirName = path.dirname(filePath)
        return {
          title,
          index,
          name,
          group,
          dirName,
          module
        }
      })
    )
  }

  const asyncLoad = () => Promise.all([serialization(zh), serialization(en)])

  return asyncLoad()
}

export const loadStaticMarkdownModule = () => {
  const load = () => {
    const zh = import.meta.glob<ModuleResult>('../../zh-cn/**/*.md', { eager: true })
    const en = import.meta.glob<ModuleResult>('../../en-us/**/*.md', { eager: true })
    return { zh, en }
  }

  const { zh, en } = load()

  const parserd = (origianl: typeof zh) => {
    const module = new Map<string, Map<string, Array<ModuleInfo>>>()

    const parseImpl = (origianl: typeof zh) => {
      Object.entries(origianl).forEach(([markdownPath, info]) => {
        const key = path.dirname(markdownPath)
        if (!module.has(key)) {
          module.set(key, new Map())
        }
        const past = module.get(key)
        const { frontmatter, default: _module } = info
        const { index = 0, group, title, name } = frontmatter
        if (!past.has(group)) {
          past.set(group, [])
        }
        const pastGroup = past.get(group)
        past.set(group, [
          ...pastGroup,
          { title, index, group: key, name: name.toLocaleLowerCase(), component: _module }
        ])
      })
    }

    parseImpl(origianl)
    return module
  }

  const zhModule = parserd(zh)
  const enModule = parserd(en)

  return { zhModule, enModule }
}

export const flatMarkdownModule = (module: ReturnType<typeof loadStaticMarkdownModule>) => {
  //
  const { zhModule, enModule } = module
  const iteraotr = (map: typeof zhModule) => {
    const m = map.entries()
    let end = false
    const result = []
    const TRUE = true
    while (!end) {
      const cur = m.next()
      if (!cur.value) break
      const [, children] = cur.value as [string, Map<string, ModuleInfo[]>]
      const item = children.entries()
      while (TRUE) {
        const sub = item.next()
        if (sub.done) break
        const [groupKey, subModule] = sub.value as [string, Array<ModuleInfo>]
        subModule.forEach((each) => {
          const { index, name, title, group } = each
          const url = `/${group}/${name}`
          result.push({ index, name, title, group, groupKey, url })
        })
      }
      if (cur.done) end = true
    }
    return result as Array<{ index: number; name: string; title: string; group: string; groupKey: string; url: string }>
  }

  return {
    zh: iteraotr(zhModule),
    en: iteraotr(enModule)
  }
}
