const { transformAsync } = require('@babel/core')
const { readFileSync, removeSync, outputFileSync } = require('fs-extra')
const { replaceStyleInJs, replaceExt } = require('./utils')

const compileJs = (filePath) => {
  return new Promise((resolve, reject) => {
    const code = replaceStyleInJs(readFileSync(filePath, 'utf-8'), '')
    transformAsync(code, { filename: filePath })
      .then((res) => {
        if (res) {
          const jsFilePath = replaceExt(filePath, '.js')
          removeSync(filePath)
          outputFileSync(jsFilePath, res.code)
          resolve()
        }
      })
      .catch(reject)
  })
}

module.exports = { compileJs }
