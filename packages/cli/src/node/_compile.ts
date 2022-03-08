import { EventEmitter } from 'events'
import fg from 'fast-glob'
import path from 'path'
import fs from 'fs-extra'
import { logErr } from '../shared/logger'
import { normalizePath } from '../shared/constant'
import { PluginDriver } from './_plugin-driver'

interface BunndleConfig {
  parrents?: string
  dotFile?: boolean
  plugins?: any[]
}

export class Bundle extends EventEmitter {
  files = new Map()
  parrents: string
  dotFile: boolean
  plugins: PluginDriver
  constructor(config?: BunndleConfig) {
    super()
    this.parrents = config.parrents
    this.dotFile = config.dotFile
    this.plugins = new PluginDriver(config.plugins)
  }
  source(patterns: string, dotFile = true) {
    this.parrents = patterns
    this.dotFile = dotFile
  }

  async process() {
    const allStats = await fg(normalizePath(path.join(this.parrents, '**', '*')), {
      dot: this.dotFile,
      stats: true
    })
    if (!allStats.length) {
      return logErr(`[Non] can not found any file in this dir ${this.parrents}`)
    }
    await Promise.all(
      allStats.map(async (stats) => {
        const absolutePath = path.resolve(this.parrents, stats.path)
        const relativePath = path.relative(this.parrents, stats.path)
        if (absolutePath.indexOf('__tests__') === -1) {
          const content = fs.readFileSync(absolutePath)
          this.files.set(stats.path, { content, path: relativePath })
        }
      })
    )
    await this.plugins.hookParallel('buildStart', [this.files, this.parrents])
    await Promise.all(
      allStats.map(async (stats) => {
        if (!this.files.has(stats.path)) return
        const { content, path } = this.files.get(stats.path)
        const res = await this.plugins.hookParallel('transform', [content.toString(), path, this.parrents])
        await Promise.all(
          res.map((item: any) => {
            if (item) {
              let key = stats.path
              if (item.extra) {
                key = item.extra
                this.files.set(key, { content: Buffer.from(item.stdout), path: item.id })
              } else {
                const meta = this.files.get(key)
                this.files.set(key, Object.assign(meta, { content: Buffer.from(item.stdout), path: item.id }))
              }
            }
          })
        )
      })
    )
  }

  async dest(dest: string, clean = false) {
    const destPath = normalizePath(dest)

    if (clean) {
      await fs.remove(destPath)
    }

    await this.plugins.hookParallel('buildEnd', [this.files, this.parrents])
    await this.writeFileTree(destPath)
  }
  async writeFileTree(destPath: string) {
    this.files.forEach((ctx, key) => {
      const { content, path: relativePath } = ctx
      const target = path.join(destPath, relativePath)
      this.emit('write', key, target)
      fs.ensureDir(path.dirname(target)).then(() => fs.writeFile(target, content))
    })
  }
}

interface BundleFn {
  input: string
  plugins?: any[]
}

interface StdoutOption {
  dir: string
  clean?: boolean
}

export const bundle = (userConfig: BundleFn) => {
  return bundleInternal(userConfig)
}

const bundleInternal = async (options: BundleFn) => {
  const bundle = new Bundle({
    parrents: options.input,
    dotFile: true,
    plugins: options.plugins
  })
  await bundle.process()
  const context = {
    async write(stdoutOption: StdoutOption) {
      const { dir, clean = true } = stdoutOption
      return bundle.dest(dir, clean)
    }
  }
  return context
}
