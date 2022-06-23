import { computed, defineComponent } from 'vue'
import { createName, addColorAlpha, createBem, isBrowser } from '../utils'
import type { ComputedRef } from 'vue'
import type { CSSProperties } from '../utils'

import './index.less'

const name = createName('Code')

const bem = createBem('fect-code')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    block: Boolean,
    name: String,
    classic: Boolean
  },
  setup(props, { slots, attrs }) {
    const withDefaultColor = () => {
      if (!isBrowser) return ''
      return window.getComputedStyle(document.documentElement).getPropertyValue('--accents-1')
    }

    const setStyle: ComputedRef<CSSProperties> = computed(() => {
      const { classic } = props
      return {
        backgroundColor: classic ? 'var(--primary-background)' : addColorAlpha(withDefaultColor(), 0.75),
        borderColor: classic ? 'var(--accents-2)' : 'var(--accents-1)'
      }
    })

    return () => {
      if (!props.block) return <code {...attrs}>{slots.default?.()}</code>
      const { name } = props
      return (
        <div class={bem('pre')} style={setStyle.value}>
          {name && <header class={bem('name')}>{name}</header>}
          <pre {...attrs}>{slots.default?.()}</pre>
        </div>
      )
    }
  }
})
