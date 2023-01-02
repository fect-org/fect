import { computed, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../composables'
import { createName, createBem } from '../utils'
import Link from '../link'
import HttpIcons from './browser-icon'
import type { UIThemesPalette } from '../themes'

import './index.less'

const name = createName('Browser')
const bem = createBem('fect-browser')

const getHostFromUrl = (url: string) => {
  try {
    return new URL(url).host
  } catch (error) {
    return url
  }
}

function getBrowserColors(palette: UIThemesPalette, invert: boolean) {
  return invert
    ? {
        color: palette.background,
        barBgColor: palette.foreground,
        inputBgColor: palette.accents_8,
        borderColor: palette.accents_7,
        titleColor: palette.accents_2
      }
    : {
        color: palette.foreground,
        barBgColor: palette.background,
        inputBgColor: palette.accents_1,
        borderColor: palette.border,
        titleColor: palette.accents_5
      }
}

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    invert: Boolean,
    url: {
      type: String,
      default: ''
    },
    showFullLink: Boolean,
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, { attrs, slots }) {
    const { SCALES } = useScale()
    const { theme } = useTheme()

    const addressLink = computed(() => {
      const { showFullLink, url } = props
      if (showFullLink) return url
      return getHostFromUrl(url)
    })

    const renderTitle = () => {
      const { title } = props
      return (
        <div class={bem('title')}>
          <span>{title}</span>
        </div>
      )
    }

    const renderAddress = () => {
      return (
        <div class={bem('input')}>
          <span class="https">
            <HttpIcons />
          </span>
          <Link href={props.url} {...attrs}>
            {addressLink.value}
          </Link>
        </div>
      )
    }

    const renderHead = computed(() => {
      const { url, title } = props
      if (url) return renderAddress()
      if (title) return renderTitle()
      return null
    })

    const baseStyle = computed(() => {
      const { expressiveness, layout, palette } = theme.value
      const { color, barBgColor, borderColor, inputBgColor, titleColor } = getBrowserColors(palette, props.invert)
      return {
        '--browser-shadow': expressiveness.shadowLarge,
        '--browser-radius': layout.radius,
        '--browser-gap-half': layout.gapHalf,
        '--browser-color': color,
        '--browser-bar-bg-color': barBgColor,
        '--browser-border': borderColor,
        '--browser-input-bg-color': inputBgColor,
        '--browser-title-color': titleColor
      }
    })

    const setCssVariables = computed(() => {
      return {
        ...baseStyle.value,
        '--browser-font-size': SCALES.font(1),
        '--browser-width': SCALES.width(1, 'max-content'),
        '--browser-height': SCALES.height(1, 'auto'),
        '--browser-pt': SCALES.pt(0),
        '--browser-pr': SCALES.pr(0),
        '--browser-pb': SCALES.pb(0),
        '--browser-pl': SCALES.pl(0),
        '--browser-mt': SCALES.mt(0),
        '--browser-mr': SCALES.mr(0, 'auto'),
        '--browser-mb': SCALES.mb(0),
        '--browser-ml': SCALES.ml(0, 'auto')
      }
    })

    return () => (
      <div class={bem(null, { invert: props.invert })} style={setCssVariables.value}>
        <header class={bem('traffic')}>
          <div class="traffic__content">
            <span class="close" role="browser-close" />
            <span class="mini" role="browser-mini" />
            <span class="full" role="browser-full" />
          </div>
          {renderHead.value}
        </header>
        {slots.default?.()}
      </div>
    )
  }
})
