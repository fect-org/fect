const { readFile, removeSync, outputFileSync } = require('fs-extra')
const { replaceExt } = require('./constant')
const { transformAsync } = require('@babel/core')

const compilerJs = async (filePath) => {
  try {
    const code = await readFile(filePath, 'utf8')
    const res = await transformAsync(code, { filename: filePath })
    const jsFilePath = replaceExt(filePath, '.js')
    removeSync(filePath)
    outputFileSync(jsFilePath, res.code)
  } catch (error) {
    throw error
  }
}

module.exports = { compilerJs }
