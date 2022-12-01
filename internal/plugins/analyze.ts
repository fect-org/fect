import path from 'path'
import fs from '../fs'
import { slash, isScript, len } from '../shared'
import type { Plugin, ModuleFormat } from 'rollup'

const generatorModule = (str: string, format: ModuleFormat = 'esm') => {
  if (['cjs', 'commonjs'].includes(format)) return `require('${str}');\n`
  return `import '${str}';\n`
}

const ensureStyleFileExists = (entry: string, replace = true) => {
  entry = slash(entry)
  const style = path.join(replace ? path.dirname(entry) : entry, 'index.less')
  return fs.existsSync(style)
}

interface Config {
  base: string
}

export const analyze = (config: Config): Plugin => {
  return {
    name: 'internal-css-analyze',
    generateBundle(opt, bundles) {
      const exlucdes = ['composables', 'utils']
      const buckets = new Map<
        string,
        {
          imports: string[]
          facadeModuleId: string
        }
      >()
      let components: string[] = []

      const track: Record<string, string[]> = {}
      for (const filename in bundles) {
        if (!isScript(filename)) continue
        const dir = path.dirname(filename)
        if (dir === '.' || exlucdes.some((v) => dir.includes(v))) continue
        const meta = bundles[filename]
        if (meta.type === 'asset') continue
        const { imports, facadeModuleId } = meta
        if (!facadeModuleId) continue
        components.push(dir)
        buckets.set(filename, {
          imports,
          facadeModuleId
        })
      }
      components = Array.from(new Set(components))
      buckets.forEach(({ facadeModuleId, imports }, bucket) => {
        const hasExists = ensureStyleFileExists(facadeModuleId)
        const dir = path.dirname(bucket)
        if (!track[dir]) track[dir] = []
        if (hasExists) track[dir].push('../index.css')
        if (!len(imports)) return
        imports.forEach((dep) => {
          if (path.extname(dep)) {
            const prefix = dep.split('/').at(0) as string
            if (!components.includes(prefix)) return
            const prefixPath = path.join(config.base, prefix)
            const relativePath = path.relative(facadeModuleId, prefixPath)
            if (relativePath === '..') return
            const exists = ensureStyleFileExists(prefixPath, false)
            if (exists) track[dir].push(slash(`${relativePath}/index.css`))
          }
        })
      })

      for (const key in track) {
        const final = Array.from(new Set(track[key])).map((item) => generatorModule(item, opt.format))
        const str = final.reduce((acc, cur) => (acc += cur), '')
        this.emitFile({ type: 'asset', fileName: `${key}/style/index.js`, source: str })
      }
    }
  }
}
