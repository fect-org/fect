const { readdir, readdirSync, readFile, outputFileSync } = require('fs-extra')
const { join } = require('path')

;(async () => {
  const pkgPath = join(__dirname, 'packages')
  const IGNORE = ['utils', 'index.ts']
  const camelize = (str) => str.replace(/-(\w)/g, (_, key) => key.toUpperCase())
  const meta = (name, s) => {
    const names = name.charAt(0).toUpperCase() + name.slice(1)
    return `
    import { withInstall } from '../utils';
    import _${s} from './${name}';\n
    export const ${s} = withInstall(_${s});\n
    export default ${s}
    `
  }
  readdirSync(pkgPath)
    .filter((v) => !IGNORE.includes(v))
    .map((name) => {
      const ss = name.charAt(0).toUpperCase() + name.slice(1)
      const metas = meta(name, camelize(ss))
      const entry = join(pkgPath, name, 'index.ts')
      outputFileSync(entry, metas)
      // console.log(entry)
    })
})()
