import { outputFileSync, remove, readJSON } from 'fs-extra'
import { join, dirname } from 'path'

export const compileStyleDeps = async (filePath: string) => {
  const data = await readJSON(filePath, 'utf8')
  const depsKeys = Object.keys(data)
  const { BABEL_ENV } = process.env

  const styles = depsKeys
    .map((key) => {
      if (!data[key]) return
      if (BABEL_ENV === 'commonjs') return `require("${data[key]}");\n`
      return `import "${data[key]}";\n`
    })
    .join('')
  const output = join(dirname(filePath), 'style', 'index.js')
  outputFileSync(output, styles)
  await remove(filePath)
}
