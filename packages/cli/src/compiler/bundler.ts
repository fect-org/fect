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
} from 'fs-extra'
import { join, dirname, extname, basename } from 'path'
import { getNonConf, USER_NON_PATH } from '../shared/get-config'
import { Formats } from '../config/non.config'
import { logErr, logWarn } from '../shared/logger'
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
  TSCONFIG_PATH,
} from '../shared/constant'

import { compilerStyle } from './compiler-style'
import { compilerJs } from './compiler-js'
import { compilerStyleDeps } from './gen-style-deps'
import ora from 'ora'

export class Bundler {
  entry: string
  output: string
  library: boolean
  formats: Formats

  constructor() {
    this.entry = getNonConf('entry')
    this.library = getNonConf('library')
    this.formats = getNonConf('formats')
  }

  async changeCode(filePath) {
    let code
    code = await readFile(filePath, 'utf8')
    code = replaceStyleInJs(code, '')
    outputFileSync(filePath, code)
    return
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
      if (!['.tsx', '.less'].includes(extname(filePath))) return
      const dirPath = dirname(filePath)
      const dirPathJson = join(dirPath, 'style.json')
      const component = basename(dirPath)
      const code = readFileSync(filePath, 'utf8')
      const imports = (filePath.endsWith('.tsx') && code.match(IMPORT_REG)) || []
      const hasStyle = filePath.endsWith('.less')
      const defaultStyle = hasStyle ? '../index.css' : ''
      styleDeps[component] = {
        ...styleDeps[component],
        [component]: defaultStyle,
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
              ...styleDeps[component],
              [depsComponent]: `../../${depsComponent}/index.css`,
            }
          }
        }
      })
      outputJSONSync(dirPathJson, styleDeps[component])
    }

    const analyzeDeps = (component) => {
      const dir = join(path, component)
      this.compilerDir(dir, setDeps)
    }
    await Promise.all(compoents.map((cop) => analyzeDeps(cop)))
  }

  /**
   * it will remove all dist dir before user run
   */
  private beforeRun() {
    if (!this.library)
      return logErr(`[Non Error!] you can not use it when your set library as false in your config at ${USER_NON_PATH}`)
    const formats: Formats[] = ['cjs', 'default', 'es', 'umd']
    if (!formats.includes(this.formats))
      return logErr(`[Non Error!] can't read right format in ${USER_NON_PATH}. Props formats: ${getNonConf('formats')}`)
    return new Promise(async (resolve) => {
      const paths = [TMP_PATH, CJS_PATH, ESM_PATH, DTS_PATH]
      await Promise.all(paths.map((path) => remove(path)))
      resolve(true)
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
        name: 'es',
      },
      {
        text: 'Build Commonjs Outputs',
        task: () => this.genCJS(),
        name: 'cjs',
      },
      {
        text: 'Build Declaration Outputs',
        task: () => this.genDTS(),
      },
      {
        text: 'Build UMD Outputs',
        task: () => this.genUMD(),
        name: 'umd',
      },
    ]
    if (this.formats === 'default') return tasks

    const filterTasks = tasks.reduce((acc, cur) => {
      if (cur.name === this.formats) acc.push(cur)
      !cur.name && acc.push(cur)
      return acc
    }, [])

    return filterTasks
  }

  async compilerComponent() {
    await copy(TMP_PATH, this.output)
    this.compilerDir(this.output, this.compilerFile)
  }

  private async genESM() {
    console.log(2)
    setBabelEnv('esmodule')
    this.output = ESM_PATH
    await this.compilerComponent()
  }

  private async genCJS() {
    setBabelEnv('commonjs')
    console.log(1)
    this.output = CJS_PATH
    await this.compilerComponent()
  }

  private async genDTS() {
    console.log(3)
    const declaration = await readFile(DECLARATION_PATH)
    outputFileSync(TSCONFIG_PATH, declaration)

    return new Promise((resolve) =>
      spawn('tsc', ['-p', TSCONFIG_PATH], {
        shell: true,
      }).on('close', () => resolve(true))
    )
  }

  private genUMD() {}

  private initlize() {
    return new Promise(async (resolve) => {
      try {
        await Promise.all([this.compilerDir(TMP_PATH, this.changeCode)])
        resolve(true)
      } catch (error) {
        logErr(error)
        process.exit(1)
      }
    })
  }

  async run() {
    await this.beforeRun()
    setNodeENV('production')
    await copy(this.entry, TMP_PATH)
    // compiler tmp dir and gen Style deps
    let idx = 0
    await this.initlize()
    this.tasks.reduce(
      (previous, { text, task }) =>
        previous.then(() => {
          const spinner = ora(text).start()
          try {
            task()
            spinner.succeed(text)
            idx++
          } catch (error) {
            logErr(error)
            process.exit(1)
          }
        }),
      Promise.resolve()
    )
    if (idx === this.tasks.length) {
      console.log(idx)
      return removeSync(TMP_PATH)
    }
    // removeSync(TMP_PATH)
  }
}
