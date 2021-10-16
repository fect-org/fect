import {
  copy,
  readdir,
  remove,
  readFile,
  outputFileSync,
  readFileSync,
  removeSync,
  readdirSync,
  outputJSONSync,
} from 'fs-extra'
import ora from 'ora'
import { join, dirname, basename, extname } from 'path'
import { build } from 'vite'
import { spawn } from 'child_process'

import { getNonConf } from '../shared/get-config'

import {
  setNodeENV,
  TMP_PATH,
  normalizePath,
  isDir,
  isTestDir,
  replaceStyleInJs,
  setBabelEnv,
  ESM_PATH,
  CJS_PATH,
  IMPORT_REG,
  isScript,
  isStyle,
  DTS_PATH,
  DECLARATION_PATH,
  TSCONFIG_PATH,
} from '../shared/constant'
import { compilerStyle } from './compiler-style'
import { compilerJs } from './compiler-js'
import { compilerStyleDeps } from './gen-style-deps'
import { useUMDconfig } from '../config/@vite/vite.config'

export class Bundler {
  entry: string
  output: string
  constructor() {
    this.entry = getNonConf('entry')
    this.output = ''
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

  async compilerDir(dir, cb) {
    const files = await readdir(dir)
    await Promise.all(
      files.map((file) => {
        const filePath = normalizePath(join(dir, file))
        try {
          if (isTestDir(filePath)) return remove(filePath)
          if (isDir(filePath)) return this.compilerDir(filePath, cb)
          return cb.call(this, filePath)
        } catch (error) {
          console.log(error)
        }
        // eslint-disable-next-line comma-dangle
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

  async compilerComponent() {
    await copy(TMP_PATH, this.output)
    await this.compilerDir(this.output, this.compilerFile)
  }

  async genUMD() {
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
    ${stylePaths}
    `
    outputFileSync(umdJs, content)
    await build(useUMDconfig(true))
    await build(useUMDconfig())
    remove(umdJs)
  }

  async genESM() {
    setBabelEnv('esmodule')
    this.output = ESM_PATH
    await this.compilerComponent()
  }

  async genCommon() {
    setBabelEnv('commonjs')
    this.output = CJS_PATH
    await this.compilerComponent()
  }
  async genDTS() {
    const declaration = await readFile(DECLARATION_PATH)
    outputFileSync(TSCONFIG_PATH, declaration)
    spawn('tsc', ['-p', TSCONFIG_PATH], {
      shell: true,
    })
  }
  tasks = [
    {
      text: 'Build ESModule Outputs',
      task: this.genESM,
    },
    {
      text: 'Build Commonjs Outputs',
      task: this.genCommon,
    },
    {
      text: 'Build Declaration Outputs',
      task: this.genDTS,
    },
    // {
    //   text: 'Build UMD Outputs',
    //   task: this.genUMD,
    // },
  ]

  async run() {
    setNodeENV('production')
    const done = this.tasks.length
    let idx = 0
    await copy(this.entry, TMP_PATH)
    await this.compilerDir(TMP_PATH, this.changeCode)
    await this.genStyleDeps(TMP_PATH)
    for (const key in this.tasks) {
      const { text, task } = this.tasks[key]
      const spinner = ora(text).start()
      try {
        await task.call(this)
        spinner.succeed(text)
        idx++
      } catch (error) {
        console.error(error)
        process.exit(1)
      }
    }
    idx === done && removeSync(TMP_PATH)
  }

  async clean() {
    Promise.all([TMP_PATH, CJS_PATH, ESM_PATH, DTS_PATH].map((path) => remove(path)))
  }
}
