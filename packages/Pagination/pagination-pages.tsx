import { defineComponent, computed, watchEffect, ref } from 'vue'
import { useProvider } from '../utils'
import PaginationItem from './pagination-item'
import PaginationEllipsis from './pagination-ellipsis'
import { READONLY_PAGINATION_KEY, PaginationProvide } from './type'

const PaginationPages = defineComponent({
  props: {
    current: [Number],
    count: [String, Number],
    limit: Number,
  },
  setup(props, { slots, emit }) {
    const showBeforeEllipsis = ref<boolean>(false)
    const showAfterEllipsis = ref<boolean>(false)
    const isLess = ref<boolean>(false) // control less or normal

    const { context } = useProvider<PaginationProvide>(READONLY_PAGINATION_KEY)
    const setPage = (page: number) => context?.setCurrentPage(page)

    const visbilePage = computed(() => {
      const limit = Number(props.limit)
      return (limit % 2 === 0 ? limit - 1 : limit) - 2
    })

    watchEffect(() => {
      const count = Number(props.count)
      const current = Number(props.current)
      const limit = Number(props.limit)
      const middleNum = (visbilePage.value + 1) / 2
      showBeforeEllipsis.value = false
      showAfterEllipsis.value = false
      isLess.value = Number(count) < Number(limit) ? true : false
      if (count > limit) {
        if (current > middleNum + 1) {
          showBeforeEllipsis.value = true
        }
        if (current < count - middleNum) {
          showAfterEllipsis.value = true
        }
      }
    })
    const pagers = computed(() => {
      const count = Number(props.count)
      const current = Number(props.current)
      const limit = Number(props.limit)
      const showBefore = showBeforeEllipsis.value
      const showAfter = showAfterEllipsis.value
      const middleNum = (visbilePage.value + 1) / 2
      const pageArr = []
      if (showBefore && showAfter) {
        const offset = middleNum - 1
        for (let i = current; i <= current + offset; i++) {
          pageArr.push(i)
        }
        return pageArr
      }
      if (showBefore && !showAfter) {
        for (let i = current; i <= count - 1; i++) {
          pageArr.push(i)
        }
        return pageArr
      }

      if (!showBefore && showAfter) {
        for (let i = 2; i < limit; i++) {
          pageArr.push(i)
        }
        return pageArr
      }
      for (let i = 2; i < count; i++) {
        pageArr.push(i)
      }

      return pageArr
    })

    /**
     * A common base render element
     * value as page num , active as index
     * while page num equal active num it will set active attribute
     */
    const renderItem = (value: number, active: number) => {
      return (
        <PaginationItem
          active={value === active}
          key={`pagination-item-${value}`}
          onClick={() => setPage(value)}
        >
          {value}
        </PaginationItem>
      )
    }

    const renderEllipsis = (value: number, key: string, isBefore = false) => {
      return (
        <PaginationEllipsis
          key={`pagination-ellipsis-${key}`}
          isBefore={isBefore}
          onClick={() => setPage(value)}
        />
      )
    }

    /**
     * when limit value older than count value use it
     */
    const renderlessLimit = () => {
      return [...new Array(Number(props.count))].map((_, index) => {
        const value = index + 1
        const current = Number(props.current)
        return renderItem(value, current)
      })
    }

    const renderNormal = () => {
      const current = Number(props.current)
      const count = Number(props.count)
      const beforeValue = current - 5 >= 1 ? current - 5 : 1
      const afterValue = current + 5 <= count ? current + 5 : count
      return (
        <>
          {renderItem(1, current)}
          {showBeforeEllipsis.value &&
            renderEllipsis(beforeValue, 'before', true)}
          {pagers.value.map((page) => renderItem(page, current))}
          {showAfterEllipsis.value && renderEllipsis(afterValue, 'after')}
          {renderItem(Number(count), current)}
        </>
      )
    }

    return () => <>{isLess.value ? renderlessLimit() : renderNormal()}</>
  },
})

export default PaginationPages
