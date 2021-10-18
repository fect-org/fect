import { defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { READONLY_PAGINATION_KEY, PaginationProvide } from './type'
import PaginationItem from './pagination-item'

const PaginationPrev = defineComponent({
  setup(props, { slots }) {
    const { context } = useProvider<PaginationProvide>(READONLY_PAGINATION_KEY)

    return () => (
      <PaginationItem disabled={context!.head.value} onClick={() => context!.updateSidePage('prev')}>
        {slots.default?.()}
      </PaginationItem>
    )
  },
})

export default PaginationPrev
