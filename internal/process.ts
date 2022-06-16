import { spawn } from 'child_process'

export const execa = (cmd: string, args?: string[]) => {
  return new Promise((resolve, reject) => {
    const cp = spawn(cmd, args ?? [], {
      cwd: process.cwd(),
      shell: process.platform === 'win32',
      stdio: ['inherit']
    })
    cp.on('exit', () => cp.kill('SIGHUP'))
    cp.on('close', (code) => {
      if (code === 0) return resolve('')
      return reject()
    })
  })
}
