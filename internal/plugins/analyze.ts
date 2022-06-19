import path from 'path'
import fs from 'fs-extra'
import type { Plugin } from 'rollup'
import { includes, normalizePath } from '../shared'

/**
 * This is a internal analyze style deps plugin. If you want to
 * use in your project. It mayn't work as well as it.
 */

interface AnalyzeConfig {
  entryDir: string
  mapper: string[]
}

const generatorModule = (str: string, format: 'cjs' | 'esm' = 'esm') => {
  if (format === 'cjs') return `require('${str}');\n`
  return `import '${str}';\n`
}

export const analyze = (config: AnalyzeConfig): Plugin => {
  config.entryDir = normalizePath(config.entryDir)
  return {
    name: 'rollup-plugin-analyze',
    generateBundle(_, bundle) {
      const realPaths = new Set()
      const imports = new Map()
      /**
       * A not good way to determine the file generation format determines whether it is esm or cjs.
       *
       */
      let format: 'cjs' | 'esm'
      Object.keys(bundle).forEach((key) => {
        const { fileName, importedBindings } = bundle[key] as any
        const realPath = normalizePath(path.join(config.entryDir, path.dirname(fileName)))
        if (!format) {
          if (fileName.includes('esm')) {
            format = 'esm'
          }
          if (fileName.includes('cjs')) {
            format = 'cjs'
          }
        }
        if (imports.has(realPath)) {
          const previous = imports.get(realPath)
          imports.set(realPath, { ...previous, ...importedBindings })
          return
        }
        imports.set(realPath, importedBindings)
      })
      const realList = Array.from(realPaths).filter((v) => v !== config.entryDir)
      if (imports.has(config.entryDir)) imports.delete(config.entryDir)
      realList.forEach((key) => {
        if (imports.has(key)) {
          const collections: Record<string, string> = {}

          const selfEntry = path.join(key as string, 'index.less')
          if (fs.existsSync(selfEntry)) collections[selfEntry] = generatorModule('./index.less', format)
          const deps = imports.get(key)

          const shouldBeAnalyzed: Array<Record<string, string[]>> = []
          for (const dep in deps) {
            if (!deps[dep].length) continue
            shouldBeAnalyzed.push({
              [dep]: deps[dep]
            })
          }

          if (shouldBeAnalyzed.length) {
            shouldBeAnalyzed.forEach((draft: Record<string, string[]>) => {
              const parentKey = key as string
              for (const dep in draft) {
                if (!includes(config.mapper, draft[dep])) continue
                let subStyleEntry = path.join(config.entryDir, path.dirname(dep), 'index.less')
                if (fs.existsSync(subStyleEntry)) {
                  subStyleEntry = subStyleEntry.replace('.less', '.css')
                  const imports = normalizePath(path.relative(parentKey, subStyleEntry))
                  Reflect.set(collections, dep, generatorModule(imports, format))
                }
              }
            })
          }

          const res = Object.values(collections).reduce((acc, cur) => (acc += cur), '')
          const dest = (key as string).split('/').pop() || ''
          this.emitFile({ type: 'asset', fileName: `${dest}/style/index.js`, source: res })
        }
      })
    }
  }
}
