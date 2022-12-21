import { computed, defineComponent, toRef } from 'vue'
import { assign } from '@fect-ui/shared'
import { createName, createBem, addUnit } from '../utils'
import { props } from './props'
import { createLayoutContext } from './layout-context'
import type { CSSProperties } from 'vue'

import './index.less'

const name = createName('Row')
const bem = createBem('fect-row')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const { provider } = createLayoutContext()

    provider({ gutter: toRef(props, 'gutter') })

    const setRowClass = computed(() => {
      const { justify, align } = props
      return bem(null, [justify, align])
    })

    const setStyle = computed(() => {
      const style = {}
      if (props.gutter) {
        const gap = `calc(-${addUnit(props.gutter)} / 2)`
        assign(style, { marginLeft: gap, marginRight: gap } as CSSProperties)
      }
      return style
    })

    return () => {
      const { tag: ElementTag } = props
      return (
        <ElementTag class={setRowClass.value} style={setStyle.value}>
          {slots.default?.()}
        </ElementTag>
      )
    }
  }
})
