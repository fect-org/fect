import { defineComponent, toRef } from 'vue'
import { isArray, make } from '@fect-ui/shared'
import { createName, createBem, addUnit } from '../utils'
import { createSkeletonContext } from './skeleton-context'
import SkeletonItem from '../skeleton-item'
import type { PropType } from 'vue'

const name = createName('Skeleton')

const bem = createBem('fect-skeleton')

const DEFAULT_ROW_WIDTH = '100%'

export default defineComponent({
  name,
  props: {
    loading: Boolean,
    rows: {
      type: Number,
      default: 0
    },
    animated: {
      type: Boolean,
      default: true
    },
    rowsWidth: {
      type: [Number, String, Array] as PropType<number | string | (number | string)[]>,
      default: DEFAULT_ROW_WIDTH
    }
  },
  setup(props, { slots }) {
    const { provider } = createSkeletonContext()

    const getRowWidth = (index: number) => {
      const { rowsWidth } = props
      if (rowsWidth === DEFAULT_ROW_WIDTH) return DEFAULT_ROW_WIDTH
      if (isArray(rowsWidth)) return rowsWidth[index]
      return rowsWidth
    }

    provider({ animated: toRef(props, 'animated') })

    return () => {
      const { skeleton } = slots
      /**
       * if props loading as true . the real structure DOM will be displayed
       */
      if (props.loading) return slots.default?.()
      return (
        <div class={bem(null)}>
          {skeleton
            ? skeleton()
            : make(props.rows).map((_, i) => <SkeletonItem style={{ width: addUnit(getRowWidth(i)) }} />)}
        </div>
      )
    }
  }
})
