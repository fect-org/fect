import { defineComponent, PropType, Transition, ref, nextTick, watch } from 'vue'
import { createBem, isChildElement } from '../utils'
import { Placement } from './props'

const bem = createBem('fect-drawer')

export default defineComponent({
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'right'
    },
    round: Boolean,
    visible: Boolean
  },
  setup(props, { slots }) {
    const drawerRef = ref<HTMLElement>()
    const tabStartRef = ref<HTMLDivElement>()
    const tabEndRef = ref<HTMLDivElement>()

    watch(
      () => props.visible,
      (visible) => {
        if (!visible) return
        const { activeElement } = document
        const isChild = isChildElement(drawerRef.value, activeElement)
        if (isChild) return
        nextTick(() => tabStartRef.value?.focus())
      }
    )

    const onKeyDown = (e: KeyboardEvent) => {
      const isTabDown = e.keyCode === 9
      if (!props.visible || !isTabDown) return
      const { activeElement } = document
      if (e.shiftKey) {
        if (activeElement === tabStartRef.value) {
          tabEndRef.value?.focus()
        }
      } else {
        if (activeElement === tabEndRef.value) {
          tabStartRef.value?.focus()
        }
      }
    }

    return () => (
      <Transition name="drawer-fade">
        <div
          class={bem('wrapper', [props.placement, { round: props.round }])}
          role="dialog"
          tabindex={-1}
          onKeydown={onKeyDown}
          v-show={props.visible}
        >
          <div class={bem('hidden')} tabindex={0} aria-hidden="true" ref={tabStartRef} />
          {slots.default?.()}
          <div class={bem('hidden')} tabindex={0} aria-hidden="true" ref={tabEndRef} />
        </div>
      </Transition>
    )
  }
})
