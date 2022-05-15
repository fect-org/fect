import { computed, defineComponent } from 'vue'
import { createName, createBem } from '../utils'
import Link from '../link'
import HttpIcons from './image-browser-icon'

import './index.less'

const name = createName('ImageBrowser')
const bem = createBem('fect-image')

const getHostFromUrl = (url: string) => {
  try {
    return new URL(url).host
  } catch (error) {
    return url
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

    return () => (
      <div class={bem('browser', { invert: props.invert })}>
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
