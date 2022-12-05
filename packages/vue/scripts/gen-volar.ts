import { gen, genExports, formatCode } from 'internal'
import path from 'path'
import fs from 'fs'
import { name as packageName } from '../package.json'

const entry = path.join(__dirname, '..', 'src')
const prefix = 'Fe'

const output = path.join(__dirname, '..', 'components.d.ts')

const ignored = ['utils']

;(async () => {
  const { directories } = await gen(entry, { ignored })
  const exports = await genExports(directories)
  const str = exports
    .flat()
    .reduce((acc, cur) => (acc += `${prefix}${cur}: typeof import("${packageName}")["${cur}"];\n`), '')
  // Ref see volar docs: https://github.com/johnsoncodehk/volar/tree/master/extensions/vscode-vue-language-features
  const code = formatCode(`
declare module "@vue/runtime-core"{
    export interface GlobalComponents {
      ${str}
    }
};\n
export {};\n
`)

  await fs.promises.writeFile(output, code, 'utf8')
})()
