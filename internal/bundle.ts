import path from 'path'
import fs from 'fs'
import { execa } from './process'

export const declarationTask = async (root: string = process.cwd()) => {
  const declaration = await fs.promises.readFile(path.join(__dirname, './declaration.json'), 'utf-8')
  const resolvePath = path.join(root, 'declaration.json')
  await fs.promises.writeFile(resolvePath, declaration, 'utf-8')
  /**
   * TODO. when generator declaration. will check package types
   * but currently we should ignored it.
   */
  await execa('tsc', ['-p', resolvePath]).catch((e) => e)
  await fs.promises.unlink(resolvePath)
}
