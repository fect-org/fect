import { defineComponent } from 'vue'
import { useProvider } from '../utils'
import { READONLY_PAGINATION_KEY, PaginationProvide } from './type'

const PaginationSimple = defineComponent({
  setup() {
    const { context } = useProvider<PaginationProvide>(READONLY_PAGINATION_KEY)
    return () => (
      <li class="pagination-simple__desc">
        {context!.modelValue.value}/{context!.count.value}
      </li>
    )
  },
})

export default PaginationSimple
