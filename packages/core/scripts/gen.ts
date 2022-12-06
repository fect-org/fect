import { genVuePackageMeta, formatCode } from 'internal'
import path from 'path'
import fs from 'fs'
import { version } from '../package.json'

const entry = path.join(__dirname, '..', 'src')

const ignored = ['utils']

;(async () => {
  const code = await genVuePackageMeta(entry, { ignored, version })
  await fs.promises.writeFile(path.join(entry, 'index.ts'), formatCode(code), 'utf-8')
})()
