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
import { traverse } from './route'

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
          name: name.toLocaleLowerCase(),
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
