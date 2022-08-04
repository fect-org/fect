import fs, { existsSync, WriteFileOptions } from 'fs'
import path from 'path'

export const replaceStyleInJs = (code: string, ext = '') => code.replace(/import.+\.(css|less)'/g, ext)

export const isScript = (suffix: string) => /\.(js|jsx|ts|tsx)/g.test(suffix)

export const isStyle = (file: string) => /\.(css|less)$/.test(file)

export const isJsx = (fileName: string) => /\.(jsx|tsx)/g.test(fileName)

export const normalizePath = (path: string) => path.replace(/\\/g, '/')

export const includes = <T extends unknown[], K extends unknown[]>(source: T, tar: K) =>
  tar.every((v) => source.includes(v))

export const remove = (path: string) =>
  fs.promises
    .rm(path, {
      force: true,
      recursive: true
    })
    .then(() => true)
    .catch(() => false)

export const outputFile = async (
  file: string,
  data: any,
  options?: WriteFileOptions | BufferEncoding
): Promise<void> => {
  const dir = path.dirname(file)
  try {
    if (!existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true })
    }
    await fs.promises.writeFile(file, data, options)
  } catch (error) {
    throw error
  }
}
