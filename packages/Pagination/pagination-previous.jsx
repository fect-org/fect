import { defineComponent } from 'vue'
import { useProvider } from '../utils'
import PaginationItem from './pagination-item'

const READONLY_PAGINATION_KEY = 'paginationKey'

const PaginationPrev = defineComponent({
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_PAGINATION_KEY)

    return () => (
      <PaginationItem
        disabled={ctx.isFirst.value}
        onClick={() => ctx.sideUpdatePage('prev')}
      >
        {slots.default?.()}
      </PaginationItem>
    )
  },
})

export default PaginationPrev
