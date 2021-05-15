/**
 * This component has been abandoned
 */

import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useProvider } from '../utils'
import PaginationItem from './pagination-item'
import PaginationEllipsis from './pagination-ellipsis'

const READONLY_PAGINATION_KEY = 'paginationKey'

const PaginationPages = defineComponent({
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_PAGINATION_KEY)
    const middleNum = ref(0)
    const showBeforeEllipsis = ref(false)
    const showAfterEllipsis = ref(false)

    /**
     * can visible page area
     */
    const showPages = computed(() => {
      const limit = ctx.limit.value
      const oddLimit = limit % 2 === 0 ? limit - 1 : limit
      return oddLimit - 2
    })

    const pagesArray = [...new Array(showPages.value)]

    watchEffect(() => {
      const limit = ctx.limit.value
      const count = ctx.count.value
      const current = ctx.modelValue.value
      const middleNumber = (showPages.value + 1) / 2
      const showEllipsis = count > limit
      const before = showEllipsis && current > middleNumber + 1
      const after = showEllipsis && current < count - middleNumber
      middleNum.value = middleNumber
      showBeforeEllipsis.value = before
      showAfterEllipsis.value = after
    })

    /**
     * value as page number,active as index,
     * while page num equal acitve num it will set active attribute
     */
    const renderItem = (value, active) => (
      <PaginationItem
        active={value === active}
        key={`pagination-item-${value}`}
        onClick={() => ctx.setCurrentPage(value)}
      >
        {value}
      </PaginationItem>
    )

    // render start pages
    const renderStartPages = () => {
      return (
        <>
          {pagesArray.map((_, index) => {
            const value = index + 2
            return renderItem(value, ctx.modelValue.value)
          })}
        </>
      )
    }

    const renderMiddlePages = () => (
      <>
        {pagesArray.map((_, index) => {
          const middleIndex = middleNum.value - (index + 1)
          const value = ctx.modelValue.value - middleIndex
          return (
            <PaginationItem
              key={`pagination-middle-${index}`}
              active={index + 1 === middleIndex}
              onClick={() => ctx.setCurrentPage(value)}
            >
              {value}
            </PaginationItem>
          )
        })}
      </>
    )

    const renderEndPages = () => (
      <>
        {pagesArray.map((_, index) => {
          const value = ctx.count.value - (showPages.value - index)
          return renderItem(value, ctx.modelValue.value)
        })}
      </>
    )

    const renderLessLimit = () => (
      <>
        {[...new Array(Number(ctx.count.value))].map((_, index) => {
          const value = index + 1
          return (
            <PaginationItem
              key={`pagination-item-${value}`}
              active={value === ctx.modelValue.value}
              onClick={() => ctx.setCurrentPage(value)}
            >
              {value}
            </PaginationItem>
          )
        })}
      </>
    )

    return () => (
      <>
        {Number(ctx.count.value) < Number(ctx.limit.value) ? (
          renderLessLimit()
        ) : (
          <>
            {renderItem(1, ctx.modelValue.value)}
            {showBeforeEllipsis.value && (
              <PaginationEllipsis
                key="pagination-ellipsis-before"
                isBefore
                onClick={() =>
                  ctx.setCurrentPage(
                    ctx.modelValue.value - 5 >= 1 ? ctx.modelValue.value - 5 : 1,
                  )
                }
              />
            )}
            {showBeforeEllipsis.value && showAfterEllipsis.value
              ? renderMiddlePages()
              : showBeforeEllipsis.value
                ? renderEndPages()
                : renderStartPages()}
            {showAfterEllipsis.value && (
              <PaginationEllipsis
                key="pagination-ellipsis-after"
                onClick={() =>
                  ctx.setCurrentPage(
                    ctx.modelValue.value + 5 <= ctx.count.value
                      ? ctx.modelValue.value + 5
                      : ctx.count.value,
                  )
                }
              />
            )}
            {renderItem(ctx.count.value, ctx.modelValue.value)}
          </>
        )}
      </>
    )
  },
})

export default PaginationPages
