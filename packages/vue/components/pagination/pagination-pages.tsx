import { defineComponent, computed, watchEffect, ref } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import PaginationItem from './pagination-item'
import PaginationEllipsis from './pagination-ellipsis'
import { READONLY_PAGINATION_KEY, PaginationProvide } from './type'
import { useState } from '../utils'

const PaginationPages = defineComponent({
  props: {
    current: {
      type: Number,
      required: true,
    },
    count: {
      type: [Number],
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots, emit }) {
    const [beforeEllipsis, setBeforeEllipsis] = useState<boolean>(false)

    const [afterEllipsis, setAfterEllipsis] = useState<boolean>(false)

    const { context } = useProvider<PaginationProvide>(READONLY_PAGINATION_KEY)
    const setParentPage = (page: number) => context?.setCurrentPage(page)

    /**
     * limit as default is 7 , so it will show visiblePage
     * 5
     */
    const visbilePage = computed(() => {
      const { limit } = props
      return (limit % 2 === 0 ? limit - 1 : limit) - 2
    })

    // dispaly limit value older then count value

    const overlaod = computed(() => (props.limit > props.count ? true : false))

    const setEllipsisState = () => {
      const { count, current } = props
      const cursor = (visbilePage.value + 1) / 2

      // only work in normal mode. When overload as false
      if (!overlaod.value) {
        setBeforeEllipsis(current > cursor + 1 ? true : false)
        setAfterEllipsis(current < count - cursor ? true : false)
      }
    }

    watchEffect(setEllipsisState)

    //  work in normal .
    const dispalyedPage = computed(() => {
      const { count, current, limit } = props
      const showBefore = beforeEllipsis.value
      const showAfter = afterEllipsis.value
      const cursor = (visbilePage.value + 1) / 2
      const offset = cursor - 1
      const showBeforeAndAfter = showBefore && showAfter
      const onlyShowBefore = showBefore && !showAfter
      const onlyShowAfter = showAfter && !showBefore

      const pageNum = showBeforeAndAfter ? current + offset : onlyShowBefore ? count - 1 : onlyShowAfter ? limit : count

      const control = showBeforeAndAfter || onlyShowBefore
      return [...Array(pageNum)].reduce((acc: number[], cur: number, idx: number) => {
        idx += 1

        if (control && idx >= current) acc.push(idx)
        if (!control && idx >= 2) acc.push(idx)
        return acc
      }, []) as number[]
    })

    /**
     * A common base render element
     * value as page num , active as index
     * while page num equal active num it will set active attribute
     */
    const renderItem = (value: number, active: number) => {
      return (
        <PaginationItem active={value === active} key={`pagination-item-${value}`} onClick={() => setParentPage(value)}>
          {value}
        </PaginationItem>
      )
    }

    const renderEllipsis = (value: number, key: string, isBefore = false) => {
      return (
        <PaginationEllipsis
          key={`pagination-ellipsis-${key}`}
          isBefore={isBefore}
          onClick={() => setParentPage(value)}
        />
      )
    }

    /**
     * when limit value older than count value use it
     */
    const renderlessLimit = () => {
      const { current } = props

      return Array(props.count)
        .fill(0)
        .map((_, index) => {
          const value = index + 1
          return renderItem(value, current)
        })
    }

    const renderNormal = () => {
      const { current, count } = props
      const beforeValue = current - 5 >= 1 ? current - 5 : 1
      const afterValue = current + 5 <= count ? current + 5 : count
      return (
        <>
          {renderItem(1, current)}
          {beforeEllipsis.value && renderEllipsis(beforeValue, 'before', true)}
          {dispalyedPage.value.map((page) => renderItem(page, current))}
          {afterEllipsis.value && renderEllipsis(afterValue, 'after')}
          {renderItem(count, current)}
        </>
      )
    }

    return () => <>{overlaod.value ? renderlessLimit() : renderNormal()}</>
  },
})

export default PaginationPages
