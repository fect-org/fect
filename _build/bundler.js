const {
  readdir,
  readFileSync,
  copy,
  remove,
  removeSync,
  outputFileSync,
} = require('fs-extra')
const { join } = require('path')
const { transformAsync } = require('@babel/core')
const {
  CJS_PATH,
  ESM_PATH,
  TMP_PATH,
  setBabelEnv,
  normalizePath,
  isTestDir,
  isDir,
} = require('./constant')
const { cleanBuild } = require('./clean-build')

class Bundler {
  constructor({ entry, mode }) {
    this.entry = entry
    this.mode = mode
  }
  // async compilerJs(filePath) {
  //   return new Promise((resolve, reject) => {
  //     const code = readFileSync(filePath, 'utf-8')
  //     transformAsync(code, { filename: filePath })
  //       .then((res) => {
  //         if (res) {
  //           const jsFilePath = replaceExt(filePath, '.js')
  //           console.log(res.code)
  //           outputFileSync(jsFilePath, res.code)
  //           resolve()
  //         }
  //       })
  //       .catch(reject)
  //   })
  // }

  // async compilerFile(file) {
  //   if (/\.(css|less)$/.test(file)) return remove(file)
  //   return this.compilerJs(file)
  // }
  // async compilerDir(dir) {
  //   const files = await readdir(dir)
  //   await Promise.all(
  //     files.map((file) => {
  //       const filePath = normalizePath(join(dir, file))
  //       if (isTestDir(filePath)) {
  //         return remove(filePath)
  //       }
  //       if (isDir(filePath)) {
  //         return this.compilerDir(filePath)
  //       }
  //       return this.compilerFile(filePath)
  //     }),
  //   )
  // }
  async compilerComponent() {
    // await copy(this.entry, TMP_PATH)
    this.compilerDir(TMP_PATH)
  }

  /**
   * build esm module file
   */

  async genESM() {
    setBabelEnv('esmodule')
  }

  /**
   *  build common js file
   */
  async genCommon() {
    setBabelEnv('commonjs')
  }

  async genUMD() {
    
  }

  async run() {
    await this.genESM()
    await this.genCommon()
    // console.log(this.entry, this.mode)
  }
}

module.exports = { Bundler }
