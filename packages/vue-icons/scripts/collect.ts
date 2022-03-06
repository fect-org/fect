import fs from 'fs-extra'
import path from 'path'
import { installerTmepalte, installerImportTempalte } from './template'
const packagePath = path.join(__dirname, '../src')
const resolvePath = path.join(packagePath, './index.ts')

export const collect = async () => {
  const files = await fs.readdir(packagePath)
  const name = files
    .filter((v) => v !== 'index.ts')
    .map((file) => file.replace(/.tsx/, ''))
    .map((v) => v.charAt(0).toUpperCase() + v.slice(1))

  const imports = name.map((i) => `import ${i} from './${i.charAt(0).toLowerCase() + i.slice(1)}';\n`).join(' ')
  const components = `const components = [${name}];\n`
  const exports = `export {${name}};\n`
  const outer = installerImportTempalte + imports + components + installerTmepalte + exports
  await fs.outputFile(resolvePath, outer)
}
