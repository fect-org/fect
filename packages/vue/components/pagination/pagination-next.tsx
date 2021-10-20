import { defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { READONLY_PAGINATION_KEY, PaginationProvide } from './type'
import PaginationItem from './pagination-item'

const PaginationNext = defineComponent({
  setup(props, { slots }) {
    const { context } = useProvider<PaginationProvide>(READONLY_PAGINATION_KEY)

    return () => (
      <PaginationItem disabled={context!.end.value} onClick={() => context!.updateSidePage('next')}>
        {slots.default?.()}
      </PaginationItem>
    )
  },
})

export default PaginationNext
