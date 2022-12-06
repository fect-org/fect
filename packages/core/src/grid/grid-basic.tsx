import { defineComponent, computed } from 'vue'
import { createBem, assign } from '../utils'
import { groupBaiscProps } from './props'

import './index.less'
import { getDynamicLayoutClasses, getBasisStyle, getDynamicStyle } from './style'

const bem = createBem('fect-grid')

export default defineComponent({
  props: groupBaiscProps,
  setup(props, { slots }) {
    const setGridBasicStyle = computed(() => {
      const { alignContent, alignItems, direction, justify, xs, sm, md, lg, xl } = props
      const basisStyle = getBasisStyle({ alignContent, alignItems, direction, justify })
      if (!props.fluid) return basisStyle
      const dynamicStyle = getDynamicStyle({ xs, sm, md, lg, xl })
      return assign(basisStyle, dynamicStyle)
    })

    const setGridState = computed(() => {
      const { xs, sm, md, lg, xl, fluid } = props
      if (!fluid) return bem(null, 'live')
      return bem(null, getDynamicLayoutClasses({ xs, sm, md, lg, xl }))
    })

    return () => (
      <div class={setGridState.value} style={setGridBasicStyle.value}>
        {slots.default?.()}
      </div>
    )
  }
})
