import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import { build } from 'vite'
import { isPlainObject } from 'lodash'
import { resolveConfig } from './config'
import {
  NON_DEFAULT_PATH,
  ESM_PATH,
  TMP_PATH,
  isScript,
  isStyle,
  CJS_PATH,
  setBabelEnv,
  DECLARATION_PATH,
  setNodeENV,
  replaceStyleInJs,
  normalizePath,
  isTestDir
} from '../shared/constant'
import { logErr } from '../shared/logger'
import { execa } from '../shared/execa'
import type { Lib } from '../config/non.config'
import { resolveScriptFile, transform } from './compiler/compile-script'
import { resolveStyleFile } from './compiler/compile-style'
import { compileDir } from './compiler/compiler-dir'
import { resolveExteranlStyle } from './compiler/externalize-style'
import { compileStyleDeps } from './compiler/compile-style-deps'
import { useUMDconfig } from '../config/vite.config'

import { Bundle } from './_compile'

const middleWare = async (files: Map<string, any>) => {
  setBabelEnv('commonjs')
  files.forEach((ctx, path) => {
    const { content, path: relativePath } = ctx
    if (isScript(relativePath)) {
      const contentStr = content.toString()
      files.set(path, Object.assign(ctx, { content: Buffer.from('111') }))
      // transform(contentStr, relativePath).then(({ code }) => {
      //   files.set(path, Object.assign(ctx, { content: Buffer.from(code) }))
      // })
    }
  })
}

export const compile = async () => {
  const { userConfig, path: configPath } = await resolveConfig()
  const { lib } = userConfig
  if (!isPlainObject(lib)) {
    return logErr(`[Non Error!] you can not use it when your un set library in your config at ${configPath}`)
  }

  const { format, name, input } = lib

  const bundle = new Bundle({ parrents: input, dotFile: true })
  bundle.use(middleWare)
  await bundle.process()
  await bundle.dest(ESM_PATH, { clean: true })
}
