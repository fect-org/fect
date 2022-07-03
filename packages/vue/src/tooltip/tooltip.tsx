import { defineComponent, ref, watch, nextTick, Teleport } from 'vue'
import { useClickAway, useState, useExpose } from '@fect-ui/vue-hooks'
import { createPopper, Instance as PopperInstance } from '@popperjs/core'

import { createName, createBem, kebabCase, withClassName } from '../utils'
import { useMounted } from '../composables'
import { props } from './props'
import type { PopperPlacement } from './interface'
import './index.less'

const name = createName('Tooltip')
const bem = createBem('fect-tooltip')

export default defineComponent({
  name,
  props,
  emits: ['change', 'update:visible'],
  setup(props, { slots, emit }) {
    const tooltipRef = ref<HTMLDivElement>()
    const tooltipContentRef = ref<HTMLDivElement>()
    const [visible, setVisible] = useState<boolean>(props.visible)

    let popperInstance: PopperInstance | null = null

    const createPooperInstance = () => {
      if (!tooltipRef.value || !tooltipContentRef.value) return null
      return createPopper(tooltipRef.value, tooltipContentRef.value, {
        placement: kebabCase(props.placement) as PopperPlacement,
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              adaptive: false,
              gpuAcceleration: false
            }
          },
          {
            name: 'offset',
            options: {
              offset: [0, props.offset]
            }
          }
        ]
      })
    }

    const updateLocaltion = () => {
      nextTick(() => {
        if (!visible.value) return
        if (!popperInstance) {
          popperInstance = createPooperInstance()
          return
        }
        popperInstance.setOptions({
          placement: kebabCase(props.placement) as PopperPlacement
        })
      })
    }

    const removePoperInstance = () => {
      if (popperInstance) {
        popperInstance.destroy()
        popperInstance = null
      }
    }

    useMounted([updateLocaltion, removePoperInstance])

    const preventClickHandler = (e: Event) => {
      e.stopPropagation()
      e.stopImmediatePropagation()
    }

    /**
     * render content Node
     */
    const renderContent = () => {
      const contentSlot = slots['content']
      const { visibleArrow, content, portalClass, type, teleport } = props
      /**
       *   onPopupClick={preventHandler}
          onMouseenter={() => mouseEventHandler(true)}
          onMouseleave={() => mouseEventHandler(false)}
       */
      return (
        <Teleport to={teleport}>
          <div
            class={withClassName(bem('content', type), portalClass)}
            ref={tooltipContentRef}
            v-show={visible.value}
            onClick={preventClickHandler}
          >
            <div class={bem('inner')}>
              {visibleArrow && <span class={bem('arrow', type)} />}
              {contentSlot ? contentSlot() : content}
            </div>
          </div>
        </Teleport>
      )
    }

    const updateVisible = (nextState: boolean) => {
      const { showAfter, hideAfter, trigger } = props
      // let timer: any

      // const handler = (delay: number) => {
      //   timer = setTimeout(() => {
      //     setVisible(state)
      //     clearTimeout(timer)
      //     timer = null
      //   }, delay)
      // }

      // if (state) return handler(showAfter)
      // const leave = trigger === 'hover' ? hideAfter : 0
      // handler(leave)
      let timer: number | undefined
      const clear = () => {
        clearTimeout(timer)
        timer = undefined
      }
      const handler = (nextState: boolean) => {
        setVisible(nextState)
        clear()
      }
      clear()
      if (nextState) {
        timer = window.setTimeout(() => handler(true), showAfter)
        return
      }
      const leave = trigger === 'hover' ? hideAfter : 0
      timer = window.setTimeout(() => handler(false), leave)
    }

    const mouseEventHandler = (state: boolean) => props.trigger === 'hover' && updateVisible(state)

    const tooltipClickHandler = () => {
      if (props.disabled) return
      props.trigger === 'click' && updateVisible(!visible.value)
      createPooperInstance()
    }

    /**
     * in mobile, mouseEvent can't wrok correctly , it
     * will be translate as click event .
     */
    useClickAway(() => updateVisible(false), tooltipRef)

    watch(
      () => props.visible,
      (cur) => setVisible(cur)
    )

    watch(visible, (cur) => {
      emit('update:visible', cur)
      emit('change', cur)
      updateLocaltion()
    })

    useExpose({
      mouseEventHandler,
      tooltipClickHandler,
      updateRect: updateLocaltion
    })

    return () => (
      <>
        <div
          class={bem(null)}
          ref={tooltipRef}
          onClick={tooltipClickHandler}
          onMouseenter={() => mouseEventHandler(true)}
          onMouseleave={() => mouseEventHandler(false)}
        >
          {slots.default?.()}
        </div>
        {renderContent()}
      </>
    ) 
  }
})
