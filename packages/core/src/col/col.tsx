import { computed, defineComponent } from 'vue'
import { assign } from '@fect-ui/shared'
import { createName, addUnit } from '../utils'
import { useLayoutContext } from '../row/layout-context'
import { colProps } from '../row/props'
import type { CSSProperties } from 'vue'

import './index.less'

const name = createName('Col')

const getDistance = (val: number) => {
  const t = 100 / 24
  if (val >= 24) return '100%'
  return `${t * val}%`
}

export default defineComponent({
  name,
  props: colProps,
  setup(props, { slots }) {
    const { context } = useLayoutContext()

    const setStyle = computed(() => {
      const { span, offset } = props
      const style = {
        width: getDistance(span),
        marginLeft: getDistance(offset)
      }
      if (context?.gutter) {
        const gap = `calc(${addUnit(context.gutter.value)} / 2)`
        assign(style, {
          paddingLeft: gap,
          paddingRight: gap
        } as CSSProperties)
      }
      return style
    })

    return () => {
      const { tag: ElementTag } = props
      return (
        <ElementTag style={setStyle.value} class="fect-col">
          {slots.default?.()}
        </ElementTag>
      )
    }
  }
})
