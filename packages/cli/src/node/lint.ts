import ora, { Ora } from 'ora'
import { SCRIPTS_EXTENSIONS } from '../shared/constant'
import { logErr } from '../shared/logger'
import { execa } from '../shared/execa'

const SCRIPT_LANG = [...SCRIPTS_EXTENSIONS, '.vue', '.md']

export const format = async () => {
  let spinner: Ora | null = null
  try {
    spinner = ora('start prettier code style').start()
    await execa('prettier', ['--write', '.'])
    spinner.succeed('code has already prettier')
    spinner = ora('start lint code').start()
    await execa('eslint', ['packages/**/*.{js,jsx,vue,ts,tsx}', '--fix', '--ext', SCRIPT_LANG.join('')])
    spinner.succeed('code has already lint')
  } catch (error) {
    logErr(error)
    process.exit(1)
  }
}
