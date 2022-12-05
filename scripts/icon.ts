import { Window } from 'happy-dom'
import { optimize } from 'svgo'
import path from 'path'
import { camelize, fs, shared, internalPlugins, genVuePackageMeta, formatCode } from 'internal'
import type { IElement as Element } from 'happy-dom'
import type { Config } from 'svgo'

const ICON_SELECTOR = '.geist-container > .icon'

const ICON_SELECTOR_TEXT = '.geist-text'

const ICON_PATH = path.join(process.cwd(), 'packages', 'vue-icons', 'src')

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
        attrs: ['svg:color', 'svg:data-testid']
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
    str,
    camelizeName: camelize(name)
  }
}

function defineComponent(componentName: string, el: string) {
  el = el
    .replace(/width="{props.size}"/, 'width={props.size}')
    .replace(/height="{props.size}"/, 'height={props.size}')
    .replace(/style="{props.color}"/, 'style={props.color}')

  return `
import { defineComponent } from 'vue'

export default defineComponent({
  name: '${componentName}',
  props: {
    color: {
      type: String,
      default: 'currentColor'
    },
    size: {
      type: [String,Number],
      default: 24
    }
  },
  setup (props) {
    return ()=>${el}
  }
})`
}

async function main() {
  const icons: Record<
    string,
    {
      kebaseName: string
      component: string
    }
  > = {}
  try {
    const html = fs.readFileSync(path.join(__dirname, '.icon'), 'utf8')
    const { document } = new Window()
    document.body.innerHTML = html
    const elements = document.querySelectorAll(ICON_SELECTOR)
    if (!shared.len(elements)) throw new Error("\nCan't found svg elements. please check icon.ts file.\n")
    elements.forEach((element) => {
      const { name, str: elementString, camelizeName } = getSvg(element)
      icons[name] = {
        component: defineComponent(camelizeName.charAt(0).toUpperCase() + camelizeName.slice(1), elementString),
        kebaseName: name
      }
    })
  } catch (error) {
    throw error
  }
  await fs.remove(ICON_PATH)
  await Promise.all(
    Object.values(icons).map(async ({ component, kebaseName }) => {
      const filename = path.join(ICON_PATH, `${kebaseName}.tsx`)
      await fs.outputFile(filename, component, 'utf8')
    })
  )
  // geneartor entry
  const { version } = await fs.readJson<{ version: string }>(path.join(path.dirname(ICON_PATH), 'package.json'))
  const code = await genVuePackageMeta(ICON_PATH, { fileOnly: true, version, ignored: ['index.ts'] })
  await fs.outputFile(path.join(ICON_PATH, 'index.ts'), formatCode(code), 'utf8')
}

main()
