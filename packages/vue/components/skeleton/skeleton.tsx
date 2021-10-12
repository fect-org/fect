import { PropType, defineComponent } from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import SkeletonItem from '../skeleton-item'

const name = createName('Skeleton')

const DEFAULT_ROW_WIDTH = '100%'

export const READONLY_SKELETON_KEY = 'SkeletonKey'

export type SkeletonProvide = {
  animated: boolean
}

export default defineComponent({
  name,
  props: {
    loading: Boolean,
    rows: {
      type: Number,
      default: 0,
    },
    animated: {
      type: Boolean,
      default: true,
    },
    rowsWidth: {
      type: [Number, String, Array] as PropType<
        number | string | (number | string)[]
      >,
      default: DEFAULT_ROW_WIDTH,
    },
  },
  setup(props, { slots }) {
    const { provider } = createProvider(READONLY_SKELETON_KEY)
    provider({ animated: props.animated })

    /**
     *  If has not slots.skeleton while render this
     */

    const getRowWidth = (index: number) => {
      const { rowsWidth } = props
      if (rowsWidth === DEFAULT_ROW_WIDTH) {
        return DEFAULT_ROW_WIDTH
      }
      if (Array.isArray(rowsWidth)) {
        return rowsWidth[index]
      }
      return rowsWidth
    }
    const setWidth = (val: string | number) => {
      if (typeof val === 'number') return `${val}px`
      return val
    }

    const renderRows = () => {
      const Rows: Array<JSX.Element | undefined> = []
      const { rows } = props
      Rows.length = rows
      return Rows.fill(undefined).map((_, i) => (
        <SkeletonItem style={{ width: setWidth(getRowWidth(i)) }} />
      ))
    }

    return () => {
      const hasSkeleton = slots['skeleton']
      /**
       * if props loading as true . the real structure DOM will be displayed
       */
      if (props.loading) {
        return slots.default?.()
      }
      return (
        <div class="fect-skeleton">
          <div class="skeleton__content">
            {hasSkeleton ? hasSkeleton() : renderRows()}
          </div>
        </div>
      )
    }
  },
})
