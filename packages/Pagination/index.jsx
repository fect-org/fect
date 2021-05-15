import { computed, watch, ref, watchEffect, toRefs } from 'vue'
import { createNameSpace, validator, theme, createProvider } from '../utils'
import PaginationPages from './pagination-pages'
import PaginationNext from './pagination-next'
import PaginationPrev from './pagination-previous'
import PaginationSimple from './pagination-simple'
import './pagination.less'

const [createComponent] = createNameSpace('Pagination')
const { normalSizes } = theme

const READONLY_PAGINATION_KEY = 'paginationKey'

const queryPaginationSize = (size) => {
  const sizes = {
    mini: { font: '12px', width: '20px' },
    small: { font: '12px', width: '26.5px' },
    medium: { font: '14px', width: '32px' },
    large: { font: '16px', width: '38.5px' },
  }
  return sizes[size]
}

export default createComponent({
  props: {
    modelValue: {
      // use modelValue as currentPage
      type: Number,
      default: 1,
    },
    count: {
      type: [String, Number],
      default: 1,
    },
    size: {
      type: String,
      default: 'medium',
      validator: validator.enums(normalSizes),
    },
    prevText: { type: String, default: 'Prev' },
    nextText: { type: String, default: 'Next' },
    simple: Boolean,
    limit: { type: Number, default: 7 },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, slots, emit }) {
    const currentPage = ref(props.modelValue)
    const setCurrentPage = (val) => (currentPage.value = Number(val))

    /**
     * control prev and next button disabled style
     */

    const isFirst = ref(false)
    const isLast = ref(false)

    /**
     * check safe limit value
     */
    if (process.env.NODE_ENV !== 'production' && props.count < 1) {
      console.error(
        '[Fect] <Pagination> the minimum count value must be more than 1 .',
      )
      return
    }
    if (
      process.env.NODE_ENV !== 'production'
      && props.limit <= 2
      && !props.simple
    ) {
      console.error(
        '[Fect] <Pagination> the minimum limit value must be more than 3 .',
      )
      return
    }

    // func use in prev and next
    const sideUpdatePage = (type) => {
      const cur = currentPage.value
      if (type === 'prev' && currentPage.value > 1) {
        setCurrentPage(cur - 1)
      }
      if (type === 'next' && currentPage.value < props.count) {
        setCurrentPage(cur + 1)
      }
    }

    watchEffect(() => {
      const page = currentPage.value
      isFirst.value = page <= 1
      isLast.value = page >= props.count
    })

    const baseStyle = computed(() => {
      const { font: _font, width: _width } = queryPaginationSize(props.size)
      const style = {
        fontSize: _font,
      }
      style['--pagination-size'] = _width
      return style
    })

    const { provider } = createProvider(READONLY_PAGINATION_KEY)
    provider({
      setCurrentPage,
      sideUpdatePage,
      ...toRefs(props),
      isFirst,
      isLast,
    })

    watch(currentPage, (page) => {
      emit('update:modelValue', page)
      emit('change', page)
    })

    const renderPrev = () => {
      // when slots.prev is exists, it will use custom prve render
      const prevSlot = slots['prev']
      return (
        <>
          {prevSlot ? (
            <li
              class="paginatuon-slots__custom"
              onClick={() => sideUpdatePage('prev')}
            >
              {prevSlot()}
            </li>
          ) : (
            <PaginationPrev>{props.prevText}</PaginationPrev>
          )}
        </>
      )
    }

    const renderNext = () => {
      // when slots.next is exists, it will use custom next render
      const nextSlot = slots['next']
      return (
        <>
          {nextSlot ? (
            <li
              class="paginatuon-slots__custom"
              onClick={() => sideUpdatePage('next')}
            >
              {nextSlot()}
            </li>
          ) : (
            <PaginationNext>{props.nextText}</PaginationNext>
          )}
        </>
      )
    }

    const renderPage = () => {
      const isSimple = props.simple
      return (
        <>
          {isSimple ? (
            <PaginationSimple />
          ) : (
            <PaginationPages
              current={props.modelValue}
              count={props.count}
              limit={props.limit}
            />
          )}
        </>
      )
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
  },
})
