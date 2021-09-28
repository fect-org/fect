const {
  readdir,
  removeSync,
  copy,
  remove,
  outputFileSync,
  readFile,
} = require('fs-extra')
const webpack = require('webpack')
const { join } = require('path')
const ora = require('ora')
const { exec } = require('child_process')

const {
  CJS_PATH,
  ESM_PATH,
  TMP_PATH,
  DECLARATION_PATH,
  TSCONFIG_PATH,
  SCRIPT_PATH,
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
const { GenStyleDeps } = require('./gen-style-deps')
const { compilerJs } = require('./compiler-js')
const { cleanBuild } = require('./clean-build')
const { getUMDConfig } = require('./config/webpack.umd')

class Bundler {
  constructor({ entry, mode }) {
    this.entry = entry
    this.mode = mode
    this.output = ''
  }

  async changeCode(filePath) {
    let code
    code = await readFile(filePath, 'utf8')
    code = replaceStyleInJs(code, 'import "./style/index"')
    outputFileSync(filePath, code)
  }

  async compilerFile(file) {
    if (isScript(file)) {
      return compilerJs(file)
    }
    if (isStyle(file)) {
      return compileStyle(file)
    }
    return file
  }
  async compilerDir(dir) {
    const files = await readdir(dir)
    await Promise.all(
      files.map((file) => {
        const filePath = normalizePath(join(dir, file))
        if (isTestDir(filePath)) {
          return remove(filePath)
        }
        if (isDir(filePath)) {
          return this.compilerDir(filePath)
        }
        return this.output
          ? this.compilerFile(filePath)
          : this.changeCode(filePath)
      }),
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
    await this.compilerDir(this.output)
  }

  /**
   * build esm module file
   */

  async genESM() {
    setBabelEnv('esmodule')
    this.output = ESM_PATH
    await this.compilerComponent()
    await GenStyleDeps.getStyleDeps(this.output)
  }

  /**
   *  build common js file
   */
  async genCommon() {
    setBabelEnv('commonjs')
    this.output = CJS_PATH
    await this.compilerComponent()
    await GenStyleDeps.getStyleDeps(this.output)
  }

  async genUMD() {
    setBabelEnv('esmodule')
    await this.compilerUMD(false)
    await this.compilerUMD(true)
  }

  async genDTS() {
    const declaration = await readFile(DECLARATION_PATH)
    outputFileSync(TSCONFIG_PATH, declaration)
    await exec('tsc', ['-p', TSCONFIG_PATH])
    // await execa('tsc', ['-p', TSCONFIG_PATH])
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
    await copy(this.entry, TMP_PATH)
    await this.compilerDir(TMP_PATH)
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
    removeSync(SCRIPT_PATH)
  }
  static async cleanBuild() {
    await cleanBuild()
  }
}

module.exports = { Bundler }
