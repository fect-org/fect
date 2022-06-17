import ora from 'ora'
import path from 'path'
import fs from 'fs'
import type { BumpOptions, BumpOutputOptions } from 'no-bump'
import { execa } from './process'

export interface BuildTaskConfig extends BumpOptions {
  taskName: string
}

export const commonOutput: BumpOutputOptions = {
  sourceMap: false,
  preserveModules: true,
  extractHelpers: false
}

export const TASK_NAME = {
  COMMONJS: 'CommonJs',
  ESMODULE: 'EsModule',
  DECLARATION: 'Declaration'
}

export const runTask = (describe: string, fn?: () => void | Promise<void>) => {
  const spinner = ora(describe).start()
  if (!fn) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fn = () => {}
  }
  const r = fn()
  if (!r || !r.then) {
    spinner.succeed(describe)
    return r
  }
  const p = Promise.resolve(r).then(() => {
    spinner.succeed(describe)
  })
  return p
}

export const declarationTask = async (root: string = process.cwd()) => {
  const declaration = await fs.promises.readFile(path.join(__dirname, './declaration.json'), 'utf-8')
  const resolvePath = path.join(root, 'declaration.json')
  await fs.promises.writeFile(resolvePath, declaration, 'utf-8')
  await execa('tsc', ['-p', resolvePath])
  await fs.promises.unlink(resolvePath)
}
