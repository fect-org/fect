import { Window } from 'happy-dom'
import { optimize } from 'svgo'
import { camelize, fs, shared, internalPlugins } from 'internal'
import type { IElement as Element } from 'happy-dom'
import type { Config } from 'svgo'

const ICON_SOURCE = 'https://vercel.com/design/icons'

const ICON_SELECTOR = '.geist-container > .icon'

const ICON_SELECTOR_TEXT = '.geist-text'

const SVGO_OPTIONS: Config = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupNumericValues: {
            floatPrecision: 1
          }
        }
      }
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['svg:width', 'svg:height', 'svg:style', 'svg:color', 'svg:data-testid']
      }
    },
    internalPlugins.svg
  ]
}

function getSvg(element: Element) {
  const name = element.querySelector(ICON_SELECTOR_TEXT).textContent
  const el = element.querySelector('svg')
  const str = optimize(el.outerHTML, SVGO_OPTIONS).data
  return {
    name,
    str
  }
}

async function main() {
  const [major] = process.versions.node.split('.')
  if (+major < 18) throw new Error('Please ensure your node version is greater than 18.')
  const icons = {}
  try {
    const html = await (await fetch(ICON_SOURCE)).text()
    const { document } = new Window()
    document.body.innerHTML = html
    const elements = document.querySelectorAll(ICON_SELECTOR)
    if (!shared.len(elements)) throw new Error("\nCan't found svg elements. please check icon.ts file.\n")
    elements.forEach((element) => {
      const { name, str: elementString } = getSvg(element)
      icons[name] = {
        element: elementString,
        kebaseName: name,
        camlizeName: camelize(name)
      }
    })
  } catch (error) {
    throw error
  }
  console.log(icons)
}

main()
