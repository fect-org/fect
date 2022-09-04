/**
 * steps:
 *    - Read all exist markdown file at first time.
 *    - parser to router struct
 *    - return router struct is converted into a string and returned
 */

import path from 'path'
import { URLSearchParams } from 'url'
import fg from 'fast-glob'
import fs from 'fs/promises'
import { composeSfcBlocks } from 'vite-plugin-md'

import type { Plugin } from 'vite'

const defaultWd = process.cwd()

const websiteWd = path.join(defaultWd, 'docs', 'layout', 'common')

const slash = (path: string) => path.replace(/\\/g, '/')

const virtualModule = `virtual:router`

const virtualId = '/@virtual:router/modules'

const initialize = () => {
  return {}
}

// const ensureServer = () => {
//   //
// }

const parserRequest = (id: string) => {
  const [moduleId, raw] = id.split('?', 2)
  const query = new URLSearchParams(raw)
  const pageId = query.get('id')
  return {
    moduleId,
    query,
    pageId
  }
}

const loadGlob = (entry: string, ext = '.md') => {
  return fg(slash(path.join(entry, `**/*${ext}`)), {
    onlyFiles: true,
    dot: true
  })
}

const loadStaticMarkdonModuleImpl = async () => {
  const originalModulePath = slash(path.join(defaultWd, 'docs'))
  const zh = await loadGlob(slash(path.join(defaultWd, 'docs', 'zh-cn')))
  const en = await loadGlob(slash(path.join(defaultWd, 'docs', 'en-us')))
  const serialization = async (files: string[]) => {
    return Promise.all(
      files.map(async (file) => {
        const staticRaw = await fs.readFile(file, 'utf8')
        const {
          frontmatter: { title, index, name, group }
        } = await composeSfcBlocks(file, staticRaw)
        const dirName = path.basename(slash(path.dirname(file)).replace(originalModulePath, ''))
        // console.log(slash(path.relative(websiteWd, file)))
        // https://github1s.com/vitejs/vite/blob/HEAD/packages/vite/src/node/plugins/importMetaGlob.ts
        return {
          title,
          index,
          name: name?.toLocaleLowerCase(),
          group,
          dirName
          //   module: () => '123'
        }
      })
    )
  }
  const asyncLoad = () => Promise.all([serialization(zh), serialization(en)])
  return asyncLoad()
}

export const loadStaticMarkdonModule = (): Plugin => {
  //
  let cc: any = null
  return {
    enforce: 'pre',
    name: 'virtual:loader',
    async buildStart() {
      const originalModule = await loadStaticMarkdonModuleImpl()
      cc = originalModule
    },
    resolveId(id) {
      if (virtualModule === id) return `${virtualId}?id=${id}`
      return null
    },
    async load(id) {
      const { moduleId, pageId } = parserRequest(id)
      if (moduleId === virtualId && pageId) {
        return `export default ${JSON.stringify(cc)}`
      }
      return null
    }
  }
}
