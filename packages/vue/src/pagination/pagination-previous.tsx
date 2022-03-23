import { defineComponent } from 'vue'
import { createBem } from '../utils'
import PaginationItem from './pagination-item'
import { usePaginationContext } from './pagination-context'

const bem = createBem('fect-pagination')

export default defineComponent({
  setup(props, { slots }) {
    const { context } = usePaginationContext()

    return () => (
      <PaginationItem
        class={bem('prev', { simple: context!.props.simple })}
        disabled={context!.shouldDisabledPrevious.value}
        onClick={() => context!.updateSidePage('prev')}
      >
        {slots.default?.()}
      </PaginationItem>
    )
  }
})
