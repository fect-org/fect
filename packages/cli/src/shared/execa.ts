import { spawn } from 'child_process'

const _execa = (cmd, options) => spawn(cmd, options, { shell: true })

export const execa = (cmd, options) =>
  new Promise((resolve, reject) => {
    const cp = _execa(cmd, options)
    cp.on('exit', (exitCode, signal) => {
      resolve({ exitCode, signal })
    })
    cp.on('error', (error) => {
      reject(error)
    })
  })
