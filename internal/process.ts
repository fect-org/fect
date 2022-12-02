import path from 'path'
import { spawn } from 'child_process'
import fs from './fs'

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
