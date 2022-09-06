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
