/**
 * Author : XeryYue
 *
 **/
const { readdirSync, copySync, readdir, remove, copy } = require('fs-extra')
const { resolve } = require('path')
const { isDir, isTestDir, normalizePath, isStyle } = require('./utils')
const { setBabelEnv, setNodeEnv } = require('./environment')
const { compileJs } = require('./compiler-js')
const { compileStyle } = require('./compiler-style')

const SourcePath = resolve(__dirname, '.././source')

const esPath = resolve(__dirname, '.././es') // es
const libPath = resolve(__dirname, '.././lib') // cjs

const PACKAGE_PATH = resolve(__dirname, '.././packages')

const filterComponent = () => {
  readdirSync(PACKAGE_PATH)
    .map((dir) => isDir(resolve(PACKAGE_PATH, dir)) && dir)
    .filter((dir) => dir)
    .map((dir) => {
      const outPath = resolve(SourcePath, dir.toLocaleLowerCase())
      const sourcePath = resolve(PACKAGE_PATH, dir)
      copySync(sourcePath, outPath)
    })
}

const compilerFile = async (file) => {
  if (isStyle(file)) {
    return compileStyle(file)
  }
  return compileJs(file)
}

const compilerDir = async (dir) => {
  const files = await readdir(dir)

  await Promise.all(
    files.map((file) => {
      const filePath = normalizePath(resolve(dir, file))
      if (isTestDir(filePath)) {
        return remove(filePath)
      }
      if (isDir(filePath)) {
        return compilerDir(filePath)
      }
      return compilerFile(filePath)
    }),
  )
}

const buildEsm = async () => {
  setBabelEnv('esmodule')
  await copy(SourcePath, esPath)
  await compilerDir(esPath)
}

const buildCjs = async () => {
  setBabelEnv('commonjs')
  await copy(SourcePath, libPath)
  await compilerDir(libPath)
}

;(async () => {
  await remove(SourcePath)
  await remove(esPath)
  await filterComponent()
  setNodeEnv('production')
  await buildEsm()
  await buildCjs()
  await remove(SourcePath)
})()
