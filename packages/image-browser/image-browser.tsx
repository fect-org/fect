import { computed, defineComponent } from 'vue'
import { createName } from '../utils'
import Link from '../link'
import HttpIcons from './image-browser-icon'
import { BrowserColors } from './type'

import './index.less'

const name = createName('ImageBrowser')

const queryBrowserColors = (invert: boolean): BrowserColors => {
  const invertStyle = {
    color: 'var(--primary-background)',
    barBgColor: 'var(--primary-foreground)',
    inputBgColor: 'var(--accents-8)',
    borderColor: 'var(--accents-7)',
    titleColor: 'var(--accents-2)',
  }
  const normalStyle = {
    color: 'var(--primary-foreground)',
    barBgColor: 'var(--primary-background)',
    inputBgColor: 'var(--accents-1)',
    borderColor: 'var(--accents-2)',
    titleColor: 'var(--accents-5)',
  }
  return invert ? invertStyle : normalStyle
}

const getHostFormUrl = (url: string) => {
  try {
    return new URL(url).host
  } catch (error) {
    return url
  }
}

export default defineComponent({
  name,
  props: {
    invert: Boolean,
    url: {
      type: String,
      default: '',
    },
    showFullLink: Boolean,
    title: {
      type: String,
      default: '',
    },
  },
  setup(props, { attrs, slots }) {
    const setColors = computed(() => {
      const { invert } = props
      return queryBrowserColors(invert)
    })

    const {
      inputBgColor,
      titleColor,
      color,
      borderColor,
      barBgColor,
    } = setColors.value

    const addressLink = computed(() => {
      const { showFullLink, url } = props
      if (showFullLink) return url
      return getHostFormUrl(url)
    })

    const renderTitle = () => {
      const { title } = props
      return (
        <div class="fect-image__title" style={{ color: titleColor }}>
          <span>{title}</span>
        </div>
      )
    }

    const renderAddress = () => {
      return (
        <div
          class="fect-image__input"
          style={{ backgroundColor: inputBgColor }}
        >
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

    return () => (
      <div class="fect-image__browser">
        <header
          class="fect-image__traffic"
          style={{
            color,
            backgroundColor: barBgColor,
            borderBottomColor: borderColor,
          }}
        >
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
  },
})
