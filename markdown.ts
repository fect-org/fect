/**
 * This is a markdown resolver for vite-plugin-md
 * base on builder api
 * doc: https://github.com/antfu/vite-plugin-md/blob/main/docs/BuilderApi.md
 * Author: Kanno
 */
import fs from 'fs'
import path from 'path'
import { createBuilder } from '@yankeeinlondon/builder-api'

interface PlaygroundOptions {
  __internal__: string
}

const palygroundReg = /:::playground((.|\r|\n)*?):::/g
const scriptReg = /<\s*script>([\s\S]*)<\/script>/g

const examplePath = path.join(process.cwd(), 'example')

const parserPlayground = (code: string) => {
  code = code.replace(palygroundReg, (_, c) => {
    const dirPath = c.replace(/\s/g, '')
    const exPath = path.join(examplePath, dirPath)
    const raw = fs.readFileSync(exPath, 'utf-8')
    let meta = ''
    raw.replace(scriptReg, (_, r) => {
      meta = r
      return ''
    })
    meta = (meta as any)
      .match(/name:.+(|\r|\n)/g)[0]
      .split(':')[1]
      .replace(/"/g, '')
      .replace(',', '')
    return `<playground code="${encodeURIComponent(raw)}" component=${meta} />`
  })
  return code
}

export const playground = createBuilder('playground', 'parser')
  .options<Partial<PlaygroundOptions>>()
  .initializer()
  .handler(async (payload) => {
    //
    payload.md = parserPlayground(payload.md)
    // console.log(payload.md, payload.fileName,payload.cod)
    return { ...payload }
  })
  .meta({ description: 'a internal playground parser' })
