import { PropType, defineComponent, toRef } from 'vue'
import { isArray } from '@fect-ui/shared'
import { createName, createBem, addUnit } from '../utils'
import { createSkeletonContext } from './skeleton-context'
import SkeletonItem from '../skeleton-item'

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

    provider({ animated: toRef(props, 'animated') })

    const getRowWidth = (index: number) => {
      const { rowsWidth } = props
      if (rowsWidth === DEFAULT_ROW_WIDTH) {
        return DEFAULT_ROW_WIDTH
      }
      if (isArray(rowsWidth)) {
        return rowsWidth[index]
      }
      return rowsWidth
    }

    const renderRows = () => {
      const Rows: Array<JSX.Element | undefined> = []
      const { rows } = props
      Rows.length = rows
      return Rows.fill(undefined).map((_, i) => <SkeletonItem style={{ width: addUnit(getRowWidth(i)) }} />)
    }

    return () => {
      const hasSkeleton = slots['skeleton']
      /**
       * if props loading as true . the real structure DOM will be displayed
       */
      if (props.loading) {
        return slots.default?.()
      }
      return <div class={bem(null)}>{hasSkeleton ? hasSkeleton() : renderRows()}</div>
    }
  }
})
