import { defineComponent, PropType, Transition } from 'vue'
import { createBem } from '../utils'
import { Placement } from './props'

const bem = createBem('fect-drawer')

export default defineComponent({
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'right'
    },
    closeable: Boolean,
    round: Boolean,
    visible: Boolean
  },
  setup(props, { slots }) {
    return () => (
      <Transition name="drawer-fade">
        <div class={bem('wrapper', [props.placement, { round: props.round }])} role="dialog" v-show={props.visible}>
          {slots.default?.()}
        </div>
      </Transition>
    )
  }
})
