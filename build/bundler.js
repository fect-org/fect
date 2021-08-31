const {
  readdir,
  removeSync,
  copy,
  remove,
  readdirSync,
  outputFileSync,
  readFile,
} = require('fs-extra')
const execa = require('execa')
const { join } = require('path')
const ora = require('ora')
const {
  CJS_PATH,
  ESM_PATH,
  TMP_PATH,
  PACKAGE_PATH,
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
    const entry = join(PACKAGE_PATH, 'index.ts')
    await execa('vue-cli-service', [
      'build',
      '--target',
      'lib',
      '--dest',
      TMP_PATH,
      '--name',
      'fect',
      entry,
    ])
    await Promise.all(
      readdirSync(TMP_PATH).map(async (file) => {
        const fullPath = normalizePath(join(TMP_PATH, file))
        if (file.endsWith('.css')) {
          await copy(fullPath, join(CJS_PATH, './main.css'))
        }
        if (file.endsWith('.min.js')) {
          await copy(fullPath, join(CJS_PATH, './fect.min.js'))
        }
        if (file.endsWith('.umd.js')) {
          await copy(fullPath, join(CJS_PATH, './fect.js'))
        }
      }),
    )
  }

  async genDTS() {
    const tsconfig = join(__dirname, '..', 'scripts/tsconfig.json')
    await execa('tsc', ['-p', tsconfig])
  }

  tasks = [
    {
      text: 'Build Declaration Outputs',
      task: this.genDTS,
    },
    {
      text: 'Build ESModule Outputs',
      task: this.genESM,
    },
    {
      text: 'Build Commonjs Outputs',
      task: this.genCommon,
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
  }
  static async cleanBuild() {
    await cleanBuild()
  }
}

module.exports = { Bundler }
