import { declarationTask } from '@fect-ui/cli'
import path from 'path'
import fs from 'fs-extra'
import { JSDOM } from 'jsdom'
import Svgo from 'svgo'
import { svgParser, camelize, replaceStyle } from './svg-parser'
import svgoConfig from './svgo.config'
import { getSVGSource } from './get-source'
import { singleDefine, exportsTemplate } from './template'
import { collect } from './gen'
import { createBundle, BumpOptions } from 'no-bump'
import { swc } from 'rollup-plugin-swc3'
import Jsx from '@vitejs/plugin-vue-jsx'
import { runTask, TASK_NAME, BuildTaskConfig, commonOutput } from 'internal'

export const PACKAGE_PATH = path.join(process.cwd(), 'src')

const clean = () => fs.remove(PACKAGE_PATH)

const { build } = createBundle({
  plugins: {
    Jsx,
    swc: swc({
      jsc: {
        target: 'es2017',
        externalHelpers: false
      },
      sourceMaps: false
    })
  }
})

const buildConfig: BumpOptions = {
  input: path.join(PACKAGE_PATH, 'index.ts'),
  output: commonOutput
}

const configs: BuildTaskConfig[] = [
  {
    taskName: TASK_NAME.COMMONJS,
    input: buildConfig.input,
    output: { ...buildConfig.output, format: 'cjs', dir: 'dist/cjs', exports: 'named' }
  },
  {
    taskName: TASK_NAME.ESMODULE,
    input: buildConfig.input,
    output: { ...buildConfig.output, format: 'esm', dir: 'dist/esm' }
  }
]

;(async () => {
  const svgs = {}
  await clean()

  const getSource = async () => {
    const source = await getSVGSource()
    const { document } = new JSDOM(source).window
    const icons = document.querySelectorAll('.geist-container > .icon')
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
  }

  const generatorIconSource = async () => {
    await Promise.all(
      Object.keys(svgs).map(async (svg) => {
        const target = path.join(PACKAGE_PATH, svg, `${svg}.tsx`)
        const entry = path.join(PACKAGE_PATH, svg, 'index.ts')
        const name = svg.charAt(0).toUpperCase() + svg.slice(1)
        const component = singleDefine(name, replaceStyle(svgs[svg]))
        await fs.outputFile(target, component)
        await fs.outputFile(entry, exportsTemplate(name))
      })
    )
    await collect()
  }
  try {
    await runTask('Fetch Icon Source', () => getSource())
    await runTask('Generator Icon source', () => generatorIconSource())
    await Promise.all(
      configs.map(async (conf) => {
        const { taskName, ...rest } = conf
        await runTask(taskName, () => build(rest))
      })
    )
    await runTask('Declaration', () => declarationTask(PACKAGE_PATH))
  } catch (error) {
    console.log(error)
    process.exit(1)
  } finally {
    clean()
  }
})()
