import path from 'path'
import { JSDOM } from 'jsdom'
import Svgo from 'svgo'
import { build } from 'no-bump'
import { svgParser, replaceStyle } from './svg-parser'
import svgoConfig from './svgo.config'
import { getSVGSource } from './get-source'
import { singleDefine, exportsTemplate } from './template'
import { collect } from './gen'

import { spinner, camelize, kebabCase, declarationTask, fs } from 'internal'

import type { BumpOptions } from 'no-bump'

export const PACKAGE_PATH = path.join(process.cwd(), 'src')

const runTask = (describe: string, fn?: () => void | Promise<void>) => {
  const { s } = spinner.useSpinner(describe)
  if (!fn) fn = () => Promise.resolve()

  const r = fn()
  if (!r || !r.then) {
    s.success()
    return r
  }
  const p = Promise.resolve(r).then(() => {
    s.success()
  })
  return p
}

const resolveConfigs = () => {
  return ['esm', 'cjs'].reduce<BumpOptions[]>((acc, cur) => {
    const conf: BumpOptions = {
      input: path.join(PACKAGE_PATH, 'index.ts'),
      output: {
        format: cur as any,
        dir: `dist/${cur}`,
        preserveModules: true,
        exports: cur === 'cjs' ? 'named' : 'auto'
      },
      internalOptions: {
        plugins: {
          swc: {
            jsc: {
              target: 'es2017'
            }
          }
        }
      }
    }
    acc.push(conf)
    return acc
  }, [])
}

;(async () => {
  const svgs = {}

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
        const target = path.join(PACKAGE_PATH, kebabCase(svg), `${kebabCase(svg)}.tsx`)
        const entry = path.join(PACKAGE_PATH, kebabCase(svg), 'index.ts')
        const name = svg.charAt(0).toUpperCase() + svg.slice(1)
        const component = singleDefine(name, replaceStyle(svgs[svg]))
        await fs.outputFile(target, component)
        await fs.outputFile(entry, exportsTemplate(name, kebabCase(svg)))
      })
    )
    await collect()
  }
  try {
    await runTask('Fetch Icon Source', () => getSource())
    await runTask('Generator Icon source', () => generatorIconSource())
    for (const conf of resolveConfigs()) {
      await runTask(conf.output.format as string, () => {
        build(conf)
      })
    }

    await runTask('Declaration', () => declarationTask())
  } catch (error) {
    console.log(error)
    process.exit(1)
  } finally {
    await fs.remove(PACKAGE_PATH)
  }
})()
