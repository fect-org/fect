import ora, { Ora } from 'ora'
import { spawn } from 'child_process'
import { SCRIPTS_EXTENSIONS } from '../shared/constant'
import { logErr } from '../shared/logger'

import { EventEmitter } from 'events'

const SCRIPT_LANG = [...SCRIPTS_EXTENSIONS, '.vue', '.md']

const execa = (cmd, options) => spawn(cmd, options, { shell: true })

class Format extends EventEmitter {
  spinner: Ora
  constructor() {
    super()
    this.spinner = null
  }
  prettier() {
    this.spinner = ora('start prettier code style').start()
    super.on('prettier', (oraCb) => {
      const stdout = execa('prettier', ['--write', '.'])
      stdout.on('exit', oraCb)
    })
  }
  eslint() {
    this.spinner = ora('start lint code').start()
    super.on('eslint', (oraCb) => {
      const stdout = execa('eslint', ['packages/**/*.{js,jsx,vue,ts,tsx}', '--fix', '--ext', SCRIPT_LANG.join('')])
      stdout.on('exit', oraCb)
    })
  }

  emitter(evt, fn) {
    return new Promise((resolve, reject) => {
      this.emit(evt, () => {
        try {
          fn?.()
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  async doFormat() {
    try {
      this.eslint()
      await this.emitter('eslint', () => this.spinner.succeed('code has already lint'))
      this.prettier()
      await this.emitter('prettier', () => this.spinner.succeed('code has already prettier'))
    } catch (error) {
      logErr(error)
    }
  }
}

export const format = async () => await new Format().doFormat()
