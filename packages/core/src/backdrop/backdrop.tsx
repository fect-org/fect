import { defineComponent, Transition } from 'vue'
import { useExpose, useState } from '@fect-ui/vue-hooks'
import { props } from './props'
import { createBem, createName, withClassName } from '../utils'

import './index.less'

const bem = createBem('fect-backdrop')
const name = createName('Backdrop')

export default defineComponent({
  name,
  inheritAttrs: false,
  props,
  emits: ['click', 'contentClick'],
  setup(props, { slots, emit, attrs }) {
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

    const clickHandler = (e: Event) => {
      if (isMouseDown.value) return
      emit('click', e)
    }

    const mouseUpHandler = () => {
      if (!isMouseDown.value) return
      const timer = setTimeout(() => {
        setIsMouseDown(false)
        clearTimeout(timer)
      }, 0)
    }

    useExpose({ isMouseDown })

    return () => {
      const { visible, contentClassName, layerClassName } = props
      return (
        <Transition name="backdrop-fade">
          <div class={bem(null)} onClick={clickHandler} onMouseup={mouseUpHandler} v-show={visible} {...attrs}>
            <div class={withClassName(bem('layer'), layerClassName)} />
            <div
              class={withClassName(bem('content'), contentClassName)}
              onClick={(e) => emit('contentClick', e)}
              onMousedown={() => setIsMouseDown(true)}
            >
              {slots.default?.()}
            </div>
          </div>
        </Transition>
      )
    }
  }
})
