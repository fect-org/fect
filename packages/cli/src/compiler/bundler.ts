import { spawn } from 'child_process'
import {
  copy,
  remove,
  removeSync,
  readdir,
  readFile,
  outputFileSync,
  outputJSONSync,
  readdirSync,
  readFileSync,
  pathExistsSync
} from 'fs-extra'
import { join, dirname, extname, basename } from 'path'
import { resolveConfig } from '../node/config'
import { Formats } from '../config/non.config'
import { logErr } from '../shared/logger'
import { EventEmitter } from './bus'
import {
  setNodeENV,
  TMP_PATH,
  ESM_PATH,
  CJS_PATH,
  DTS_PATH,
  normalizePath,
  isDir,
  isTestDir,
  replaceStyleInJs,
  setBabelEnv,
  IMPORT_REG,
  isScript,
  isStyle,
  DECLARATION_PATH,
  TSCONFIG_PATH
} from '../shared/constant'

import { compilerStyle } from './compiler-style'
import { compilerJs } from './compiler-js'
import { compilerStyleDeps } from './gen-style-deps'
import { useUMDconfig } from '../config/vite.config'
import ora from 'ora'
import { build } from 'vite'

export class Bundler extends EventEmitter {
  entry: string
  output: string
  library: boolean
  nonPath: string
  formats: Formats
  undName: string

  constructor() {
    super()
  }

  async changeCode(filePath) {
    let code
    code = await readFile(filePath, 'utf8')
    code = replaceStyleInJs(code, '')
    outputFileSync(filePath, code)
    return
  }

  private asyncEmitter(evt) {
    return new Promise((resolve, reject) => {
      super.emit(evt, () => {
        try {
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  async compilerFile(file) {
    if (/\.(json)/g.test(file)) {
      return compilerStyleDeps(file)
    }
    if (isScript(file)) {
      return compilerJs(file)
    }
    if (isStyle(file)) {
      return compilerStyle(file)
    }

    return file
  }

  async compilerDir(dir: string, cb) {
    const files = await readdir(dir)
    await Promise.all(
      files.map((file) => {
        const filePath = normalizePath(join(dir, file))
        try {
          if (isTestDir(filePath)) return remove(filePath)
          if (isDir(filePath)) return this.compilerDir(filePath, cb)
          return cb.call(this, filePath)
        } catch (error) {
          logErr(error)
        }
      })
    )
  }

  async genStyleDeps(path) {
    const IGNORE_DIR = ['utils', 'index.ts']
    const REG = /import (\w+) from/g
    const compoents = readdirSync(path).filter((_) => !IGNORE_DIR.includes(_))
    const styleDeps = {}

    const setDeps = (filePath: string) => {
      // only work on .tsx file as component
      if (!['.tsx'].includes(extname(filePath))) return
      const dirPath = dirname(filePath)

      const dirPathJson = join(dirPath, 'style.json')
      const component = basename(dirPath)
      const code = readFileSync(filePath, 'utf8')
      const imports = (filePath.endsWith('.tsx') && code.match(IMPORT_REG)) || []
      const stylePath = join(dirPath, 'index.less')
      const hasStyle = pathExistsSync(stylePath)
      const defaultStyle = hasStyle ? '../index.css' : ''
      styleDeps[component] = {
        ...styleDeps[component],
        [component]: defaultStyle
      }
      imports.map((_) => {
        // eslint-disable-next-line prefer-destructuring
        const deps = _.match(REG)
        if (deps) {
          const depsComponent = deps[0]
            .match(/\s\w+\s/g)[0]
            .replace(/\s/g, '')
            .replace(/[A-Z]/g, (_) => '-' + _)
            .toLowerCase()
            .substr(1)

          if (compoents.includes(depsComponent)) {
            styleDeps[component] = {
              [depsComponent]: `../../${depsComponent}/index.css`,
              ...styleDeps[component]
            }
          }
        }
      })
      outputJSONSync(dirPathJson, styleDeps[component])
    }

    const analyzeDeps = (component) => {
      const dir = join(path, component)
      if (!isDir(dir)) return
      this.compilerDir(dir, setDeps)
    }
    await Promise.all(compoents.map((cop) => analyzeDeps(cop)))
  }

  private beforeRun() {
    super.on('beforeRun', async (next) => {
      if (!this.library) {
        return logErr(
          `[Non Error!] you can not use it when your set library as false in your config at ${this.nonPath}`
        )
      }
      const formats: Formats[] = ['cjs', 'default', 'es', 'umd', 'noumd']
      if (!formats.includes(this.formats)) {
        return logErr(`[Non Error!] can't read right format in ${this.nonPath}. Props formats: ${this.formats}`)
      }
      const paths = [TMP_PATH, CJS_PATH, ESM_PATH, DTS_PATH]
      await Promise.all(paths.map((path) => remove(path)))
      await next()
    })
  }

  /**
   * return should do task
   */
  private get tasks() {
    const tasks = [
      {
        text: 'Build ESModule Outputs',
        task: () => this.genESM(),
        name: 'es'
      },
      {
        text: 'Build Commonjs Outputs',
        task: () => this.genCJS(),
        name: 'cjs'
      },
      {
        text: 'Build Declaration Outputs',
        task: () => this.genDTS()
      },
      {
        text: 'Build UMD Outputs',
        task: () => this.genUMD(),
        name: 'umd'
      }
    ]
    if (this.formats === 'default') return tasks
    if (this.formats === 'noumd') return tasks.splice(0, 3)
    const filterTasks = tasks.reduce((acc, cur) => {
      if (cur.name === this.formats) acc.push(cur)
      !cur.name && acc.push(cur)
      return acc
    }, [])

    return filterTasks
  }

  async compilerComponent() {
    await copy(TMP_PATH, this.output)
    await this.compilerDir(this.output, this.compilerFile)
  }

  private async genESM() {
    setBabelEnv('esmodule')
    this.output = ESM_PATH
    await this.compilerComponent()
  }

  private async genCJS() {
    setBabelEnv('commonjs')
    this.output = CJS_PATH
    await this.compilerComponent()
  }

  private async genDTS() {
    const declaration = await readFile(DECLARATION_PATH)
    outputFileSync(TSCONFIG_PATH, declaration)

    return new Promise((resolve) =>
      spawn('tsc', ['-p', TSCONFIG_PATH], {
        shell: true
      }).on('close', () => resolve(true))
    )
  }

  private async genUMD() {
    setBabelEnv('esmodule')
    const entry = join(ESM_PATH, 'index.js')
    const entryMeta = readFileSync(entry, 'utf-8')
    const umdJs = join(ESM_PATH, 'umd.js')
    const ignored = ['utils', 'index.js']
    const stylePaths = readdirSync(ESM_PATH)
      .filter((v) => !ignored.includes(v))
      .map((file) => `import './${file}/style/index.js';\n`)
      .join()
      .replace(/,/g, '')

    const content = `
  ${entryMeta}
  import '@fect-ui/themes';
  ${stylePaths}
  `
    outputFileSync(umdJs, content)
    await build(useUMDconfig(this.undName, true))
    await build(useUMDconfig(this.undName))
    remove(umdJs)
  }

  private initlize() {
    super.on('initlize', async (next) => {
      await Promise.all([this.compilerDir(TMP_PATH, this.changeCode), this.genStyleDeps(TMP_PATH)])
      await next()
    })
  }

  private copyTMP() {
    super.on('copy', async (next) => {
      await copy(this.entry, TMP_PATH)
      await next()
    })
  }

  private runTasks() {
    super.on('runTasks', () => {
      this.tasks
        .reduce(
          (previous, { text, task }) =>
            previous.then(async () => {
              const spinner = ora(text).start()
              try {
                await task()
                spinner.succeed(text)
              } catch (error) {
                logErr(error)
                process.exit(1)
              }
            }),
          Promise.resolve()
        )
        .finally(() => removeSync(TMP_PATH))
    })
  }

  async resolveConfig() {
    const { path, userConfig } = await resolveConfig()
    const { entry, library, formats, name } = userConfig
    this.entry = entry
    this.library = library
    this.formats = formats
    this.undName = name
    this.nonPath = path
  }

  /**
   * make func run as a promise function.
   */
  async run() {
    setNodeENV('production')
    await this.resolveConfig()
    this.beforeRun()
    this.initlize()
    this.copyTMP()
    this.runTasks()
    await this.asyncEmitter('beforeRun')
    await this.asyncEmitter('copy')
    await this.asyncEmitter('initlize')
    await this.asyncEmitter('runTasks')
  }
}

export const bundler = () => {
  const bundler = new Bundler()
  bundler.run()
}
