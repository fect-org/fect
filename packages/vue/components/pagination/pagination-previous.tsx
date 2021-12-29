import { defineComponent } from 'vue'
import PaginationItem from './pagination-item'
import { usePaginationContext } from './pagination-context'

const PaginationPrev = defineComponent({
  setup(props, { slots }) {
    const { context } = usePaginationContext()

    return () => (
      <PaginationItem disabled={context!.head.value} onClick={() => context!.updateSidePage('prev')}>
        {slots.default?.()}
      </PaginationItem>
    )
  }
})

export default PaginationPrev
