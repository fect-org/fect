const {
  readdir,
  removeSync,
  copy,
  remove,
  outputFileSync,
  readFile,
  readdirSync,
  readFileSync,
  outputJSONSync,
} = require('fs-extra')
const webpack = require('webpack')
const { join, dirname, basename } = require('path')
const ora = require('ora')
const { spawn } = require('child_process')

const {
  CJS_PATH,
  ESM_PATH,
  TMP_PATH,
  DECLARATION_PATH,
  TSCONFIG_PATH,
  IMPORT_REG,
  setBabelEnv,
  normalizePath,
  isTestDir,
  isDir,
  isScript,
  isStyle,
  setNodeEnv,
  replaceStyleInJs,
} = require('./constant')
const { compileStyle } = require('./gen-style')
const { compilerJs } = require('./compiler-js')
const { cleanBuild } = require('./clean-build')
const { getUMDConfig } = require('./config/webpack.umd')
const { compilerStyleDeps } = require('./gen-style-deps')

class Bundler {
  constructor({ entry, mode }) {
    this.entry = entry
    this.mode = mode
    this.output = ''
  }

  // in this part will do style deps analyze
  async changeCode(filePath) {
    let code
    code = await readFile(filePath, 'utf8')
    code = replaceStyleInJs(code, '')
    outputFileSync(filePath, code)
    return
  }

  async compilerFile(file) {
    if (/\.(json)/g.test(file)) {
      // return file
      return compilerStyleDeps(file)
    }
    if (isScript(file)) {
      return compilerJs(file)
    }
    if (isStyle(file)) {
      return compileStyle(file)
    }

    return file
  }

  async compilerDir(dir, cb) {
    const files = await readdir(dir)
    await Promise.all(
      files.map((file) => {
        try {
          const filePath = normalizePath(join(dir, file))
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

  async compilerUMD(mini = false) {
    return new Promise((resolve, reject) => {
      const config = getUMDConfig(mini)
      webpack(config, (err, stats) => {
        if (err || stats?.hasErrors()) {
          reject(err || stats?.toString())
        } else {
          resolve()
        }
      })
    })
  }

  async compilerComponent() {
    await copy(TMP_PATH, this.output)
    await this.compilerDir(this.output, this.compilerFile)
  }

  /**
   * build esm module file
   */

  async genESM() {
    setBabelEnv('esmodule')
    this.output = ESM_PATH
    await this.compilerComponent()
  }

  /**
   *  build common js file
   */
  async genCommon() {
    setBabelEnv('commonjs')
    this.output = CJS_PATH
    await this.compilerComponent()
  }

  async genUMD() {
    setBabelEnv('esmodule')
    await this.compilerUMD(false)
    await this.compilerUMD(true)
  }

  async genDTS() {
    const declaration = await readFile(DECLARATION_PATH)
    outputFileSync(TSCONFIG_PATH, declaration)
    spawn('tsc', ['-p', TSCONFIG_PATH], {
      shell: true,
    })
  }

  async genStyleDeps(path) {
    const IGNORE_DIR = ['utils', 'index.ts']
    const REG = /import (\w+) from/g
    const compoents = readdirSync(path).filter((_) => !IGNORE_DIR.includes(_))
    const styleDeps = {}

    /**
     *
     * @param {string} filePath
     */

    const setDeps = (filePath) => {
      // only work on .tsx file as component
      if (!filePath.endsWith('.tsx')) return
      const dirPath = dirname(filePath)
      const dirPathJson = join(dirPath, 'style.json')
      const component = basename(dirPath)
      const code = readFileSync(filePath, 'utf8')

      const imports = code.match(IMPORT_REG) || []
      styleDeps[component] = {
        ...styleDeps[component],
        [component]: '../index.css',
      }
      imports.map((_) => {
        // eslint-disable-next-line prefer-destructuring
        const deps = _.match(REG)
        if (deps) {
          const depsComponent = deps[0]
            .match(/\s\w+\s/g)[0]
            .replace(/\s/g, '')
            .toLowerCase()
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
    {
      text: 'Build UMD Outputs',
      task: this.genUMD,
    },
  ]

  async run() {
    setNodeEnv('production')
    let idx = 0
    // copy templte dir and gen style deps
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
        spinner.fail(text)
        throw error
      }
    }

    idx === 4 && removeSync(TMP_PATH)
  }
  static async cleanBuild() {
    await cleanBuild()
  }
}

module.exports = { Bundler }
