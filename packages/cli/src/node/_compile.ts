import { EventEmitter } from 'events'
import fg from 'fast-glob'
import path from 'path'
import fs from 'fs-extra'
import { logErr } from '../shared/logger'
import { normalizePath } from '../shared/constant'

interface BunndleConfig {
  parrents?: string
  dotFile?: boolean
}

export class Bundle extends EventEmitter {
  files = new Map()
  middlewares = []
  parrents: string
  dotFile: boolean
  constructor(config?: BunndleConfig) {
    super()
    this.parrents = config.parrents
    this.dotFile = config.dotFile
  }
  source(patterns: string, dotFile = true) {
    this.parrents = this.parrents
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
      allStats.map((stats) => {
        const absolutePath = path.resolve(this.parrents, stats.path)
        const relativePath = path.relative(this.parrents, stats.path)
        if (absolutePath.indexOf('__tests__') === -1) {
          const content = fs.readFileSync(absolutePath)
          this.files.set(stats.path, { content, stats, path: relativePath })
        }
      })
    )

    for (const middleWare of this.middlewares) {
      await middleWare(this.files, this.parrents)
    }
    // await Promise.all(this.middlewares.map((middleWare) => middleWare(this.files, this.parrents)))
    return this
  }

  //   register MiddleWare
  use(middleWare) {
    this.middlewares.push(middleWare)
    return this
  }
  async dest(dest: string, { clean = false }) {
    const destPath = normalizePath(dest)

    if (clean) {
      await fs.remove(destPath)
    }
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
