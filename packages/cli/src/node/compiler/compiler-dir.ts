import path from 'path'
import fs from 'fs-extra'
import { isDir, isTestDir } from '../../shared/constant'

export const compileDir = async (dir: string, cb?) => {
  const dirs = await fs.readdir(dir)
  await Promise.all(
    dirs.map((filename) => {
      const file = path.resolve(dir, filename)
      if (isTestDir(file)) return fs.removeSync(file)
      if (isDir(file)) return compileDir(file, cb)
      return cb && cb(file)
    })
  )
}
