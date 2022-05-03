import { bundle, runTask, transformScript, CJS_PATH, ESM_PATH, declarationTask } from '@fect-ui/cli'
import path from 'path'
import fs from 'fs-extra'
import { JSDOM } from 'jsdom'
import Svgo from 'svgo'
import { svgParser, camelize, replaceStyle } from './svg-parser'
import svgoConfig from './svgo.config'
import { getSVGSource } from './get-source'
import { singleDefine } from './template'
import { collect } from './collect'

export const PACKAGE_PATH = path.join(process.cwd(), 'src')

const clean = () => fs.remove(PACKAGE_PATH)

export const build = async () => {
  const svgs = {}
  await clean()

  const getSource = async () => {
    const source = await getSVGSource()
    const { document } = new JSDOM(source).window
    const icons = document.querySelectorAll('.geist-container > .icon')
    try {
      if (!icons.length) throw new Error("\nCan't found svg elements. please check bundler.ts file.\n")
      const svgo = new Svgo(svgoConfig)
      await Promise.all(
        Array.from(icons).map(async (icon) => {
          const name = camelize(icon.querySelector('.geist-text').textContent)
          const svg = icon.querySelector('svg')
          const { data: optimizeString } = await svgo.optimize(svg.outerHTML)
          const style = svg.getAttribute('style')
          svgs[name] = svgParser(optimizeString, style)
        })
      )
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }

  const generatorIconSource = async () => {
    await Promise.all(
      Object.keys(svgs).map(async (svg) => {
        const target = path.join(PACKAGE_PATH, `${svg}.tsx`)
        const name = svg.charAt(0).toUpperCase() + svg.slice(1)
        const component = singleDefine(name, replaceStyle(svgs[svg]))
        await fs.outputFile(target, component)
      })
    )
    await collect()
  }

  const cjsTask = async (input) => {
    const cjs = await bundle({ input, plugins: [transformScript({ babelEnv: 'commonjs' })] })
    await cjs.write({ dir: CJS_PATH })
  }

  const esmTask = async (input) => {
    const cjs = await bundle({ input, plugins: [transformScript({ babelEnv: 'esmodule' })] })
    await cjs.write({ dir: ESM_PATH })
  }

  await runTask('Icon Source', () => getSource())
  await generatorIconSource()
  await runTask('Declaration', () => declarationTask(PACKAGE_PATH))
  await runTask('CommonJs', () => cjsTask(PACKAGE_PATH))
  await runTask('EsModule', () => esmTask(PACKAGE_PATH))
  await clean()
}
