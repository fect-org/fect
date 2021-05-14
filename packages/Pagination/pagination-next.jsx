import { defineComponent } from 'vue'
import { useProvider } from '../utils'
import PaginationItem from './pagination-item'

const READONLY_PAGINATION_KEY = 'paginationKey'

const PaginationNext = defineComponent({
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_PAGINATION_KEY)

    return () => (
      <PaginationItem
        disabled={ctx.isLast.value}
        onClick={() => ctx.sideUpdatePage('next')}
      >
        {slots.default?.()}
      </PaginationItem>
    )
  },
})

export default PaginationNext
