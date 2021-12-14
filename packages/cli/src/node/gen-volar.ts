import { join } from 'path'
import { readJsonSync, readdirSync, outputFile } from 'fs-extra'
import { CWD, IGNORE_DIR, USER_PACKAGES_JSON_PATH } from '../shared/constant'
import { formatCode } from '../shared/format'
import { resolveConfig } from './config'

const PASCAL_REG = /(\w)(.+)/g

const OUTPUT = join(CWD, 'components.d.ts')

const PKG_NAME = readJsonSync(USER_PACKAGES_JSON_PATH).name

export const genVolar = async () => {
  const { userConfig } = await resolveConfig()
  const pakagePath = userConfig.entry
  const components = readdirSync(pakagePath)
    .filter((_) => !IGNORE_DIR.includes(_))
    .map((cop) =>
      cop.replace(PASCAL_REG, (_, k, k1) => k.toUpperCase() + k1).replace(/-(\w)/g, (_, k) => k.toUpperCase())
    )
    .map((cop) => `Fe${cop}: typeof import("${PKG_NAME}")["${cop}"];`)
    .join('\n')

  const volarTmp = `declare module "vue"{
        export interface GlobalComponents {
           ${components}
        }
    };\n
    export {};\n
    `
  await outputFile(OUTPUT, formatCode(volarTmp))
}
