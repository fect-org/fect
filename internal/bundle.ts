import ora from 'ora'
import type { BumpOptions, BumpOutputOptions } from 'no-bump'

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
  const p = Promise.resolve(r)
  spinner.succeed(describe)
  return p
}
