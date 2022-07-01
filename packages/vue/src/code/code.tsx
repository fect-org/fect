import { computed, defineComponent, watch } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, addColorAlpha, createBem, isBrowser } from '../utils'
import { useTheme } from '../composables'
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
    const { theme } = useTheme({ withModify: false })
    const [hex, setHex] = useState('')

    watch(
      () => theme.value,
      () => {
        if (!isBrowser()) return
        const hex = window.getComputedStyle(document.documentElement).getPropertyValue('--accents-1')
        setHex(hex)
      },
      { immediate: true }
    )

    const setStyle: ComputedRef<CSSProperties> = computed(() => {
      const { classic } = props
      return {
        backgroundColor: classic ? 'var(--primary-background)' : addColorAlpha(hex.value, 0.75),
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
