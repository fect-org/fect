import { computed, defineComponent } from 'vue'
import { createName } from '../utils'
import { props } from './props'
import { getBasisStyle, getDynamicStyle, getDynamicLayoutClass } from '../grid-group/style'
import './index.less'

const name = createName('Grid')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const setStyle = computed(() => {
      const { alignContent, alignItems, direction, justify, xs, sm, md, lg, xl } = props
      const basisStyle = getBasisStyle({ alignContent, alignItems, direction, justify })
      const dynamicStyle = getDynamicStyle({ xs, sm, md, lg, xl })
      const style = Object.assign(basisStyle, dynamicStyle)
      return style
    })

    const setClass = computed(() => {
      const basisClass = 'fect-grid'
      const { xs, sm, md, lg, xl } = props
      return getDynamicLayoutClass({ xs, sm, md, lg, xl }, basisClass)
    })

    return () => (
      <div class={`fect-grid ${setClass.value}`} style={setStyle.value}>
        {slots.default?.()}
      </div>
    )
  },
})
