// const complier

const { render, FileManager } = require('less')
const {
  readFile,
  removeSync,
  readFileSync,
  writeFileSync,
} = require('fs-extra')
const postcss = require('postcss')
const { replaceExt } = require('./constant')

const POST_CSS_CONFIG = require('../postcss.config')

class TildeResolver extends FileManager {
  loadFile(filename, ...args) {
    filename = filename.replace('~', '')
    return super.loadFile.apply(this, [filename, ...args])
  }
}

const TildeResolverPlugin = {
  install(lessInstance, pluginManager) {
    pluginManager.addFileManager(new TildeResolver())
  },
}

const compileLess = async (filePath) => {
  const source = await readFile(filePath, 'utf8')
  const { css } = await render(source, {
    filename: filePath,
    plugins: [TildeResolverPlugin],
  })
  return css
}

const compileCss = async (source) => {
  const { css } = await postcss(POST_CSS_CONFIG).process(source, {
    from: undefined,
  })
  return css
}

const compileStyle = async (filepath) => {
  try {
    let source = ''
    let css = ''
    if (filepath.endsWith('.less')) {
      source = await compileLess(filepath)
      css = await compileCss(source)
    } else {
      source = readFileSync(filepath, 'utf-8')
      await compileCss(source)
    }
    writeFileSync(replaceExt(filepath, '.css'), css)
    return removeSync(filepath)
  } catch (err) {
    console.log(`Compile style failed at: ${filepath}`)
    throw err
  }
}

module.exports = {
  compileStyle,
}
