import { Teleport, Transition, watchEffect, ref, defineComponent } from 'vue'
import { createName, useExpose } from '../utils'
import { props } from './props'
import './index.less'

const name = createName('Teleport')

export default defineComponent({
  name,
  /**
   * docs see : https://v3.vuejs.org/api/options-misc.html#inheritattrs
   * We should set inheritAttrs be fasle , Because Teleport is a basic Component .
   *
   */
  inheritAttrs: false,
  props,
  emits: ['popupClick'],
  setup(props, { emit, slots, attrs }) {
    // contrl overlay dispaly

    const popupRef = ref<HTMLDivElement>()

    useExpose({ popupRef })

    // gen a mask element

    watchEffect(() => {
      const { scroll } = props
      if (scroll) return document.body.classList.add('fect--lock')
      document.body.classList.remove('fect--lock')
    })

    const clickHandler = (e: Event) => emit('popupClick', e)

    const renderOverlay = () => {
      const { overlay } = props
      if (overlay) {
        return (
          <Transition name="overlay-fade">
            <div class="fect-teleport__overlay" v-show={props.show} />
          </Transition>
        )
      }
    }

    const renderTransition = () => {
      const { transition, popupClass } = props

      return (
        <Transition name={transition}>
          <div v-show={props.show} class={popupClass} ref={popupRef} role="popup" onClick={clickHandler} {...attrs}>
            {slots.default?.()}
          </div>
        </Transition>
      )
    }

    return () => (
      <Teleport to={props.teleport}>
        {renderOverlay()}
        {renderTransition()}
      </Teleport>
    )
  }
})
