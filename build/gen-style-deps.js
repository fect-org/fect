const { readdirSync, outputFileSync, readFile } = require('fs-extra')
const { join } = require('path')
const { PACKAGE_PATH } = require('./constant')
const { transformAsync } = require('@babel/core')
const { compilerJs } = require('./compiler-js')

/**
 * collect component deployed , and gen dir to export
 */

class GenStyleDeps {
  constructor() {}
  static async analyzeComponentDeps(component, path) {
    const components = join(path, component)
    const files = readdirSync(components).filter((_) => _.endsWith('.css'))
    const genStyle = () =>
      files
        .map((style) => {
          const dep = `import '../${style}';\n`
          return dep
        })
        .join('')
    const styles = genStyle()
    const output = join(components, 'style', 'index.js')
    outputFileSync(output, styles)
    await compilerJs(output)
  }

  static getComponents() {
    const ignoredList = ['utils', 'index.ts']
    const dirs = readdirSync(PACKAGE_PATH)
    return dirs.filter((dir) => !ignoredList.includes(dir))
  }

  static async getStyleDeps(path) {
    const components = GenStyleDeps.getComponents()
    return Promise.all(
      components.map((cop) => GenStyleDeps.analyzeComponentDeps(cop, path)),
    )
  }
}

module.exports = { GenStyleDeps }
