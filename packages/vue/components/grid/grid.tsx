import { computed, defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createName, assign } from '../utils'
import { props } from './props'
import { getBasisStyle, getDynamicStyle, getDynamicLayoutClass } from '../grid-group/style'
import { GridGroupProvide, READONLY_GRID_GROUP_KEY } from '../grid-group/type'
import './index.less'

const name = createName('Grid')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const { context } = useProvider<GridGroupProvide>(READONLY_GRID_GROUP_KEY)

    const setStyle = computed(() => {
      const { alignContent, alignItems, direction, justify, xs, sm, md, lg, xl } = props
      const basisStyle = getBasisStyle({ alignContent, alignItems, direction, justify })
      if (context && context.useGrid.value) return basisStyle
      const dynamicStyle = getDynamicStyle({ xs, sm, md, lg, xl })
      return assign(basisStyle, dynamicStyle)
    })

    const setClass = computed(() => {
      const basisClass = 'fect-grid'
      const { xs, sm, md, lg, xl } = props
      if (context && context.useGrid.value) return `${basisClass}--live`
      return getDynamicLayoutClass({ xs, sm, md, lg, xl }, basisClass)
    })

    return () => (
      <div class={`fect-grid ${setClass.value}`} style={setStyle.value}>
        {slots.default?.()}
      </div>
    )
  },
})
