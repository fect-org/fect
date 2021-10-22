import { webfont } from 'webfont'
import { join } from 'path'
import { watchFile, remove } from 'fs-extra'

export const genFont = async () => {
  const formats = ['ttf', 'woff', 'woff2']
  const config = require(join(__dirname, '..', 'icon.config.ts'))
  console.log(config)
}

genFont()
