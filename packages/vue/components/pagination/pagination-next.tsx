import { defineComponent } from 'vue'
import PaginationItem from './pagination-item'
import { usePaginationContext } from './pagination-context'

const PaginationNext = defineComponent({
  setup(props, { slots }) {
    const { context } = usePaginationContext()

    return () => (
      <PaginationItem disabled={context!.shouldDisabledNext.value} onClick={() => context!.updateSidePage('next')}>
        {slots.default?.()}
      </PaginationItem>
    )
  }
})

export default PaginationNext
