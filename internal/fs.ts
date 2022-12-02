import fs from 'fs'
import path from 'path'

declare module 'fs' {
  export function outputFile(file: string, data: any, options?: fs.WriteFileOptions | BufferEncoding): Promise<void>
  export function readJson<T>(tar: string): Promise<T>
  export function remove(tar: string): Promise<void>
}

const methods = {
  outputFile,
  readJson,
  remove
}

type InternalFSMethods = keyof typeof methods

async function outputFile(file: string, data: any, options?: fs.WriteFileOptions | BufferEncoding) {
  const dir = path.dirname(file)
  try {
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true })
    }
    await fs.promises.writeFile(file, data, options)
  } catch (error) {
    throw error
  }
}

async function readJson<T>(tar: string) {
  try {
    await fs.promises.access(tar, fs.constants.F_OK)
    const res = await fs.promises.readFile(tar, 'utf8')
    return JSON.parse(res) as T
  } catch (error) {
    throw error
  }
}

function remove(tar: string) {
  return fs.promises.rm(tar, { force: true, recursive: true })
}

;(Object.keys(methods) as Array<InternalFSMethods>).forEach((method) => {
  fs[method] = methods[method] as any
})

export default fs
