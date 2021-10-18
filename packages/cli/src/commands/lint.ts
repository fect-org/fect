import ora, { Ora } from 'ora'
import { spawn } from 'child_process'
import { SCRIPTS_EXTENSIONS } from '../shared/constant'

const SCRIPT_LANG = [...SCRIPTS_EXTENSIONS, '.vue', '.md']

export const execa = (cmd, options) => spawn(cmd, options, { shell: true })

export const lint = async () => {
  let spinner: Ora
  try {
    //  use preetier lint code style
    const prettier = await execa('prettier', ['--write', '.'])
    prettier.on('spawn', () => (spinner = ora('star prettier code style').start()))
    prettier.on('exit', () => spinner.succeed('code has already prettier'))
    // use eslint check and fix code .

    const eslint = await execa('eslint', ['packages/**/*.{js,jsx,vue,ts,tsx}', '--fix', '--ext', SCRIPT_LANG.join('')])
    eslint.on('spawn', () => (spinner = ora('start lint code').start()))
    eslint.on('exit', () => spinner.succeed('code has already lint'))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
