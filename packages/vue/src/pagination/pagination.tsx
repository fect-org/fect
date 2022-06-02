import { computed, watch, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem, addColorAlpha, isDEV } from '../utils'
import { props } from './props'
import { createPaginationContext } from './pagination-context'
import PaginationPages from './pagination-pages'
import PaginationNext from './pagination-next'
import PaginationPrev from './pagination-previous'
import type { SideEvent } from './interface'
import type { CSSProperties } from '../utils'

import './index.less'

const name = createName('Pagination')

const bem = createBem('fect-pagination')

const COUNT_LOG = '[Fect] <Pagination> the minimum count value must be more than 1 .'

const LIMIT_LOG = '[Fect] <Pagination> the minimum limit value must be more than 3 .'

const getEdgeCase = (rule: any, log: string) => {
  const next = isDEV && rule
  next && console.error(log)
  return
}

export default defineComponent({
  name,
  props,
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    const { provider } = createPaginationContext()

    /**
     * control prev and next button disabled style
     */

    const [currentPage, setCurrentPage] = useState<number>(props.modelValue)

    const shouldDisabledPrevious = computed(() => currentPage.value <= 1)
    const shouldDisabledNext = computed(() => currentPage.value >= props.count)

    const setPaginationHoverStyle = computed(() => {
      const { hoverColor } = props
      return {
        '--pagination-hover': addColorAlpha(hoverColor, 0.1),
        '--pagination-activeHover': addColorAlpha(hoverColor, 0.8)
      } as CSSProperties
    })

    /**
     * check safe limit value
     */

    getEdgeCase(props.count < 1, COUNT_LOG)

    getEdgeCase(props.limit <= 2 && !props.simple, LIMIT_LOG)

    // func use in prev and next
    const updateSidePage = (type: SideEvent) => {
      if (type === 'prev' && currentPage.value > 1) {
        setCurrentPage((pre) => (pre -= 1))
      }
      if (type === 'next' && currentPage.value < props.count) {
        setCurrentPage((pre) => (pre += 1))
      }
    }

    provider({
      setCurrentPage,
      updateSidePage,
      shouldDisabledPrevious,
      shouldDisabledNext,
      props
    })

    watch(currentPage, (page) => {
      emit('update:modelValue', page)
      emit('change', page)
    })

    const renderPrev = () => {
      const prevSlot = slots['prev']
      const content = prevSlot ? prevSlot : () => props.prevText
      return <PaginationPrev>{content()}</PaginationPrev>
    }

    const renderNext = () => {
      const nextSlot = slots['next']
      const content = nextSlot ? nextSlot : () => props.nextText
      return <PaginationNext>{content()}</PaginationNext>
    }

    const renderPage = () => {
      const { simple, count, limit } = props
      if (simple) {
        return (
          <li class={bem('simple')}>
            {currentPage.value} / {count}
          </li>
        )
      }
      return <PaginationPages current={currentPage.value} count={count} limit={limit} />
    }

    return () => (
      <nav class={bem(null, props.size)} style={setPaginationHoverStyle.value}>
        {renderPrev()}
        {renderPage()}
        {renderNext()}
      </nav>
    )
  }
})
