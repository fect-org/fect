import { EventEmitter } from '@fect-ui/cli/lib/compiler/bus'
import { compile } from '@fect-ui/cli/lib/commands/compile'
import { CWD } from '@fect-ui/cli/lib/shared/constant'
import { join } from 'path'
import { remove, outputFileSync } from 'fs-extra'
import { getSVGSource } from './get-source'
import { singleDefine } from './template'
import { collect } from './collect'
import { JSDOM } from 'jsdom'
import Svgo from 'svgo'
import { svgParser, camelize, replaceStyle } from './svg-parser'
import svgoConfig from './svgo.config'
import ora, { Ora } from 'ora'

export const PACKAGE_PATH = join(CWD, 'packages')

export const SVG_PATH = join(CWD, 'svg')

class GenSvg extends EventEmitter {
  svgMap: Record<string, string>
  constructor() {
    super()
    this.svgMap = {}
  }

  private asyncEmitter(evt: string) {
    return new Promise((resolve) => super.emit(evt, () => resolve(true)))
  }

  genPackages() {
    super.on('genPackages', async (next) => {
      Object.keys(this.svgMap).map((svg) => {
        const path = join(PACKAGE_PATH, `${svg}.tsx`)
        const compoent = singleDefine(svg, replaceStyle(this.svgMap[svg]))
        return outputFileSync(path, compoent)
      })
      await collect()
      await next()
    })
  }

  genSvgDir() {
    super.on('genSvgDir', async (next) => {
      Object.keys(this.svgMap).map((svg) => outputFileSync(join(SVG_PATH, `${svg}.svg`), this.svgMap[svg]))
      await next()
    })
  }

  async getSource() {
    const source = await getSVGSource()
    const doc = new JSDOM(source).window.document
    const icons = doc.querySelectorAll('.geist-list .icon')
    const svgo = new Svgo(svgoConfig)
    await Promise.all(
      Array.from(icons).map(async (icon) => {
        const name = camelize(icon.querySelector('.geist-text').textContent)
        const svg = icon.querySelector('svg')
        const { data: optimizeString } = await svgo.optimize(svg.outerHTML)
        const style = svg.getAttribute('style')
        this.svgMap[name] = svgParser(optimizeString, style)
      })
    )
  }

  async clean() {
    await Promise.all([PACKAGE_PATH, SVG_PATH].map((dir) => remove(dir)))
  }

  compile() {
    super.on('compile', async (next) => {
      await compile()
      await next()
    })
  }

  async run() {
    let spinner: Ora
    spinner = ora('build icon ....').start()
    this.genPackages()
    this.genSvgDir()
    this.compile()
    await this.getSource()
    await this.asyncEmitter('genSvgDir')
    await this.asyncEmitter('genPackages')
    spinner.succeed('build successed~')
    await this.asyncEmitter('compile')
  }
}

export const build = async () => {
  const bundler = new GenSvg()
  await bundler.clean()
  await bundler.run()
}
