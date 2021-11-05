import { defineComponent, computed } from 'vue'

import { createName } from '../utils'
import { props } from './props'
import { getDynamicStyle, getBasisStyle, getUnitGapStyle, getDynamicLayoutClass } from './style'

import './index.less'

const name = createName('GridGroup')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    /**
     * dynamic style look like  xs sm md lg xl ... grid system work
     */
    const dynamicStyle = () => {
      const { xs, sm, md, lg, xl } = props
      return getDynamicStyle({ xs, sm, md, lg, xl })
    }
    /**
     * row style only work in row col
     */
    const useRowStyle = () => {
      const { row, col } = props
    }

    const setGroupStyle = computed(() => {
      const { alignContent, alignItems, direction, justify, gap } = props
      const basisStyle = getBasisStyle({ alignContent, alignItems, direction, justify })
      const gapStyle = getUnitGapStyle(gap)
      return Object.assign(basisStyle, gapStyle, dynamicStyle())
    })

    const setGroupClass = computed(() => {
      const basisClass = 'fect-grid__group'
      const { xs, sm, md, lg, xl } = props
      return getDynamicLayoutClass({ xs, sm, md, lg, xl }, basisClass)
    })

    return () => (
      <div
        class={`fect-grid__group fect-grid__group--${props.wrap} ${setGroupClass.value}`}
        style={setGroupStyle.value}
      >
        {slots.default?.()}
      </div>
    )
  },
})
