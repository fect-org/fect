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

export const loadStaticMarkdownModule = () => {
  interface ModuleResult {
    default: ModuleNamespace
    frontmatter: OrignalFrontMatter
  }
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
