import { computed, watch, defineComponent, Slot } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, NormalSizes, CustomCSSProperties } from '../utils'

import { props } from './props'
import { createPaginationContext } from './pagination-context'
import PaginationPages from './pagination-pages'
import PaginationNext from './pagination-next'
import PaginationPrev from './pagination-previous'
import type { PaginationSize, SideEvent } from './interface'

import './index.less'

const name = createName('Pagination')

const COUNT_LOG = '[Fect] <Pagination> the minimum count value must be more than 1 .'

const LIMIT_LOG = '[Fect] <Pagination> the minimum limit value must be more than 3 .'

const queryPaginationSize = (size: NormalSizes) => {
  const sizes: Record<NormalSizes, PaginationSize> = {
    mini: { font: '12px', width: '20px' },
    small: { font: '12px', width: '26.5px' },
    medium: { font: '14px', width: '32px' },
    large: { font: '16px', width: '38.5px' }
  }
  return sizes[size]
}

const getEdgeCase = (rule: any, log: string) => {
  const DEV = process.env.NODE_ENV !== 'production'
  const next = DEV && rule
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
      currentPage,
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

    const baseStyle = computed(() => {
      const { font: fontSize, width } = queryPaginationSize(props.size)
      const style: CustomCSSProperties = {
        fontSize,
        '--pagination-size': width
      }
      return style
    })

    const renderSide = (eventType: SideEvent, slot: Slot) => (
      <li class="paginatuon-slots__custom" onClick={() => updateSidePage(eventType)}>
        {slot()}
      </li>
    )

    const renderPrev = () => {
      const prevSlot = slots['prev']
      return <>{prevSlot ? <>{renderSide('prev', prevSlot)}</> : <PaginationPrev>{props.prevText}</PaginationPrev>}</>
    }

    const renderNext = () => {
      const nextSlot = slots['next']
      return <>{nextSlot ? <>{renderSide('next', nextSlot)}</> : <PaginationNext>{props.nextText}</PaginationNext>}</>
    }

    const renderPage = () => {
      const { simple, count, limit } = props
      if (simple) {
        return (
          <li class="pagination-simple__desc">
            {currentPage.value} / {count}
          </li>
        )
      }
      return <PaginationPages current={currentPage.value} count={count} limit={limit} />
    }

    return () => (
      <nav class="fect-pagination" style={baseStyle.value}>
        <ul>
          {renderPrev()}
          {renderPage()}
          {renderNext()}
        </ul>
      </nav>
    )
  }
})
