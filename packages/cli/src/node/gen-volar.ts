import path from 'path'
import fs from 'fs-extra'
import { init, parse } from 'es-module-lexer'
import { CWD, IGNORE_DIR, USER_PACKAGES_JSON_PATH } from '../shared/constant'
import { formatCode } from '../shared/format'
import { resolveConfig } from './config'

const PKG_NAME = fs.readJsonSync(USER_PACKAGES_JSON_PATH).name
const OUTPUT = path.join(CWD, 'components.d.ts')

export const genVolar = async () => {
  const { userConfig } = await resolveConfig()
  const pkgPath = userConfig.lib.input

  const dirs = fs.readdirSync(pkgPath).filter((_) => !IGNORE_DIR.includes(_))
  let content = ``

  await init
  dirs.forEach((dir) => {
    const copPath = path.join(pkgPath, dir, 'index.ts')
    const code = fs.readFileSync(copPath, 'utf-8')
    const [, exports] = parse(code)
    const expt = exports.filter((_) => _ !== 'default')
    for (const exp of expt) {
      content += `Fe${exp}: typeof import("${PKG_NAME}")["${exp}"];\n`
    }
    return
  })

  const temp = `declare module "vue"{
        export interface GlobalComponents {
           ${content}
        }
    };\n
    export {};\n
    `
  await fs.outputFile(OUTPUT, formatCode(temp))
}
