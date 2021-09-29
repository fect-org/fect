const { outputFileSync, readFile, remove } = require('fs-extra')
const { join, dirname } = require('path')

const compilerStyleDeps = async (file) => {
  const data = await readFile(file, 'utf8')
  const deps = JSON.parse(JSON.parse(data)).style
  const depsKeys = Object.keys(deps)
  const { BABEL_ENV } = process.env

  const styles = depsKeys
    .map((key) => {
      if (BABEL_ENV === 'commonjs') return `require("${deps[key]}");\n`
      return `import "${deps[key]}";\n`
    })
    .join('')
  const output = join(dirname(file), 'style', 'index.js')
  outputFileSync(output, styles)
  await remove(file)
}

module.exports = { compilerStyleDeps }
