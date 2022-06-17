import fs from 'fs'
import path from 'path'
import { version } from '../package.json'
import { genVuePackageMeta, formatCode } from 'internal'

const packagePath = path.join(__dirname, '../src')
const resolvePath = path.join(packagePath, './index.ts')

export const collect = async () => {
  const code = await genVuePackageMeta(packagePath, [], version)
  await fs.promises.writeFile(resolvePath, formatCode(code), 'utf-8')
}
