const { outputFileSync, remove, readJSON } = require('fs-extra')
const { join, dirname } = require('path')

const compilerStyleDeps = async (file) => {
  const data = await readJSON(file, 'utf8')
  const depsKeys = Object.keys(data)
  const { BABEL_ENV } = process.env

  const styles = depsKeys
    .map((key) => {
      if (BABEL_ENV === 'commonjs') return `require("${data[key]}");\n`
      return `import "${data[key]}";\n`
    })
    .join('')
  const output = join(dirname(file), 'style', 'index.js')
  outputFileSync(output, styles)
  await remove(file)
}

module.exports = { compilerStyleDeps }
