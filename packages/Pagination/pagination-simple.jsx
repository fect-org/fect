import { defineComponent } from 'vue'
import { useProvider } from '../utils'
const READONLY_PAGINATION_KEY = 'paginationKey'

const PaginationSimple = defineComponent({
  setup() {
    const { ctx } = useProvider(READONLY_PAGINATION_KEY)
    return () => (
      <li class="pagination-simple__desc">
        {ctx.modelValue.value}/{ctx.count.value}
      </li>
    )
  },
})

export default PaginationSimple
