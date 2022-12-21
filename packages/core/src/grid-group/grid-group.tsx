import { defineComponent, computed } from 'vue'
import { omit, assign } from '@fect-ui/shared'
import { createName, createBem } from '../utils'
import Grid from '../grid'
import GridBasic from '../grid/grid-basic'
import { gridGroupProps } from '../grid/props'
import { createGridContext } from './grid-context'
import { getUnitGapStyle, getGridStyle } from '../grid/style'

import type { Slot } from 'vue'

import './index.less'

const name = createName('GridGroup')
const bem = createBem('fect-grid')

export default defineComponent({
  name,
  props: gridGroupProps,
  setup(props, { slots }) {
    const { provider } = createGridContext()
    /**
     * When we enable col, the flow layout will fail
     */
    const isFluidLayout = computed(() => {
      if (props.col === 0) return true
      return false
    })

    const setGridGroupClasses = computed(() => {
      const { wrap } = props
      return bem('group', isFluidLayout.value ? wrap : 'wrap')
    })

    const setGridGroupStyles = computed(() => {
      const { gap, col } = props
      const gapStyle = getUnitGapStyle(gap)
      if (!isFluidLayout.value) return assign(gapStyle, getGridStyle(col))
      return gapStyle
    })

    provider({ isFluidLayout })

    const renderGrids = (content: Slot) => {
      const { count } = props
      if (typeof count === 'number') {
        const grids: Array<JSX.Element | null> = []
        grids.length = count
        return grids.fill(null).map((_, idx) => <Grid key={idx}>{content(idx)}</Grid>)
      }
      return count.map((_, idx) => <Grid key={idx}>{content(_)}</Grid>)
    }

    return () => {
      const hasGrid = slots['grid']

      return (
        <GridBasic
          class={setGridGroupClasses.value}
          style={setGridGroupStyles.value}
          {...omit(props, ['gap', 'wrap', 'col', 'count'])}
        >
          {hasGrid ? renderGrids(hasGrid) : slots.default?.()}
        </GridBasic>
      )
    }
  }
})
