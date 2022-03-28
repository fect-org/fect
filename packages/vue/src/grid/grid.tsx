import { computed, defineComponent } from 'vue'
import { createName, assign, createBem } from '../utils'
import { props } from './props'
import { useGridContext } from '../grid-group/grid-context'
import { getBasisStyle, getDynamicStyle, getDynamicLayoutClasses } from '../grid-group/style'
import './index.less'

const name = createName('Grid')
const bem = createBem('fect-grid')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const { context } = useGridContext()

    const setStyle = computed(() => {
      const { alignContent, alignItems, direction, justify, xs, sm, md, lg, xl } = props
      const basisStyle = getBasisStyle({ alignContent, alignItems, direction, justify })
      if (context && context.useGrid.value) return basisStyle
      const dynamicStyle = getDynamicStyle({ xs, sm, md, lg, xl })
      return assign(basisStyle, dynamicStyle)
    })

    const setGridClass = computed(() => {
      const { xs, sm, md, lg, xl } = props
      if (context && context.useGrid.value) return bem(null, 'live')
      return getDynamicLayoutClasses({ xs, sm, md, lg, xl }, '', bem)
    })

    return () => (
      <div class={setGridClass.value} style={setStyle.value}>
        {slots.default?.()}
      </div>
    )
  }
})
