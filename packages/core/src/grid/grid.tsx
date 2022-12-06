import { computed, defineComponent } from 'vue'
import { createName } from '../utils'
import { props } from './props'
import { useGridContext } from '../grid-group/grid-context'
import GridBasic from './grid-basic'

const name = createName('Grid')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const { context } = useGridContext()

    const fluid = computed(() => {
      if (context) return context.isFluidLayout.value
      return true
    })

    return () => <GridBasic {...props} fluid={fluid.value} v-slots={slots} />
  }
})
