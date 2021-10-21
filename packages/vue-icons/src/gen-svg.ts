import { outputFile, remove } from 'fs-extra'
import { join } from 'path'
import { JSDOM } from 'jsdom'
import { optimize } from 'svgo'
import { camelize, parseStyle, parseSvg } from './tools'
import { getSVGSource } from './update-source'
import { singleDefine } from './template'
import ora, { Ora } from 'ora'

const outDir = join(__dirname, '../packages')
const svgDir = join(__dirname, '../svg')

export class GenSvg {
  async do() {
    const svgSource = await getSVGSource()
    const doc = new JSDOM(svgSource).window.document
    const icons = doc.querySelectorAll('.geist-list .icon')
    await Array.from(icons).map(async (icon: Element) => {
      const name: string = camelize(icon.querySelector('.geist-text')!.textContent as string)
      const svg: SVGSVGElement = icon.querySelector('svg')!
      const { data: optimizeString } = optimize(svg.outerHTML)
      const styles = parseStyle(svg.getAttribute('style')!)
      const component = singleDefine(name, parseSvg(optimizeString.replace(/<svg/, '<svg viewBox="0 0 24 24"'), styles))
      await outputFile(join(outDir, `${name}.tsx`), component)
      await Promise.all([
        outputFile(join(outDir, `${name}.tsx`), component),
        outputFile(
          join(svgDir, `${name}.svg`),
          parseSvg(optimizeString.replace(/<svg/, '<svg viewBox="0 0 24 24"'), styles)
        ),
      ])
    })
  }
}

export const generator = async () => {
  let spinner: Ora
  const gen = new GenSvg()
  await remove(outDir)
  await remove(svgDir)
  spinner = ora('build icon ....').start()
  await gen.do()
  await spinner.succeed('build successed~')
}
