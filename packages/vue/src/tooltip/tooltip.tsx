import { defineComponent, ref, watch, nextTick } from 'vue'
import { useClickAway, useState } from '@fect-ui/vue-hooks'
import { createPopper, Instance as PopperInstance } from '@popperjs/core'

import { createName, useExpose, createBem, kebabCase, useMounted } from '../utils'
import Teleport from '../teleport'
import { props } from './props'
import type { ComponentInstance } from '../utils'
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
    const contentRef = ref<ComponentInstance>()
    const [show, setShow] = useState<boolean>(props.visible)
    const [teleport, setTeleport] = useState<string>('body')

    let popperInstance: PopperInstance | null = null

    const createPooperInstance = () => {
      return createPopper(tooltipRef.value!, contentRef.value!.popupRef.value, {
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
        if (!show.value) return
        if (!popperInstance) {
          popperInstance = createPooperInstance()
        } else {
          popperInstance.setOptions({
            placement: kebabCase(props.placement) as PopperPlacement
          })
        }
      })
    }

    const removePoperInstance = () => {
      if (popperInstance) {
        popperInstance.destroy()
        popperInstance = null
      }
    }

    useMounted([updateLocaltion, removePoperInstance])

    const preventHandler = (e: Event) => {
      e.stopPropagation()
      e.stopImmediatePropagation()
    }

    // render arrow Node
    const renderArrowIcon = () => <span class={bem('arrow', props.type)} />

    /**
     * render content Node
     */
    const renderContent = () => {
      const contentSlot = slots['content']
      const { visibleArrow, content, portalClass, type } = props
      return (
        <Teleport
          teleport={teleport.value}
          scroll={false}
          popupClass={bem('content', type) + ' ' + portalClass}
          onPopupClick={preventHandler}
          onMouseenter={() => mouseEventHandler(true)}
          onMouseleave={() => mouseEventHandler(false)}
          show={show.value}
          ref={contentRef}
        >
          {visibleArrow && renderArrowIcon()}

          <div class={bem('inner')}>{contentSlot ? contentSlot() : content}</div>
        </Teleport>
      )
    }

    const updateShow = (state: boolean) => {
      const { showAfter, hideAfter, trigger } = props
      let timer: any

      const handler = (delay: number) => {
        timer = setTimeout(() => {
          setShow(state)
          clearTimeout(timer)
          timer = null
        }, delay)
      }

      if (state) return handler(showAfter)
      const leave = trigger === 'hover' ? hideAfter : 0
      handler(leave)
    }

    const mouseEventHandler = (state: boolean) => props.trigger === 'hover' && updateShow(state)

    const tooltipClickHandler = () => {
      if (props.disabled) return
      props.trigger === 'click' && updateShow(!show.value)
      createPooperInstance()
    }

    /**
     * in mobile, mouseEvent can't wrok correctly , it
     * will be translate as click event .
     */
    useClickAway(() => updateShow(false), tooltipRef)

    watch(
      () => props.visible,
      (cur) => setShow(cur)
    )

    watch(show, (cur) => {
      emit('update:visible', cur)
      emit('change', cur)
      updateLocaltion()
    })

    useExpose({
      mouseEventHandler,
      tooltipClickHandler,
      setTeleport,
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
