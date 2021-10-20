import ora, { Ora } from 'ora'
import { spawn } from 'child_process'
import { SCRIPTS_EXTENSIONS } from '../shared/constant'
import { EventEmitter } from '../compiler/bus'
import { logErr } from '../shared/logger'

const SCRIPT_LANG = [...SCRIPTS_EXTENSIONS, '.vue', '.md']

export const execa = (cmd, options) => spawn(cmd, options, { shell: true })

export class Lint extends EventEmitter {
  spinner: Ora
  constructor() {
    super()
    this.spinner = null
  }
  prettier() {
    super.on('prettier', (cb?: (...args: any[]) => void) => {
      this.spinner = ora('star prettier code style').start()
      const prettier = execa('prettier', ['--write', '.'])
      prettier.on('exit', () => cb && cb())
    })
  }
  eslint() {
    super.on('eslint', (cb?: (...args) => void) => {
      this.spinner = ora('start lint code').start()
      const eslint = execa('eslint', ['packages/**/*.{js,jsx,vue,ts,tsx}', '--fix', '--ext', SCRIPT_LANG.join('')])
      eslint.on('exit', () => cb && cb())
    })
  }

  private asyncEmitter(evt, fn) {
    return new Promise((resolve, reject) => {
      super.emit(evt, () => {
        try {
          fn?.()
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  async lint() {
    this.prettier()
    this.eslint()
    try {
      await this.asyncEmitter('prettier', () => this.spinner.succeed('code has already prettier'))
      await this.asyncEmitter('eslint', () => this.spinner.succeed('code has already lint'))
    } catch (error) {
      logErr(error)
    }
  }
}

export const lint = () => {
  const lint = new Lint()
  lint.lint()
}
