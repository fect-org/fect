import { defineComponent, ref, watch, nextTick, Teleport } from 'vue'
import { useClickAway, useState, useExpose } from '@fect-ui/vue-hooks'
import { createPopper } from '@popperjs/core'
import { createName, createBem, kebabCase, withClassName, withModifiers, noop } from '../utils'
import { useMounted } from '../composables'
import { props } from './props'

import type { PopperPlacement, PopperInstance } from './interface'

import './index.less'

const name = createName('Tooltip')
const bem = createBem('fect-tooltip')

export default defineComponent({
  name,
  inheritAttrs: false,
  props,
  emits: ['change', 'update:visible'],
  setup(props, { slots, emit, attrs }) {
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

    const renderContent = () => {
      const contentSlot = slots['content']
      const { visibleArrow, content, portalClass, type, teleport } = props

      return (
        <Teleport to={teleport}>
          <div
            class={withClassName(bem('content', type), portalClass)}
            ref={tooltipContentRef}
            v-show={visible.value}
            onMouseenter={() => mouseEventHandler(true)}
            onMouseleave={() => mouseEventHandler(false)}
            {...withModifiers(
              {
                onClick: noop
              },
              ['stop']
            )}
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
    }

    // With mbile. mouse event can't work correctly , so we use click event instead
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
      updateRect: updateLocaltion,
      tooltipVisible: visible
    })

    return () => (
      <>
        <div
          class={bem(null)}
          ref={tooltipRef}
          onClick={tooltipClickHandler}
          onMouseenter={() => mouseEventHandler(true)}
          onMouseleave={() => mouseEventHandler(false)}
          {...attrs}
        >
          {slots.default?.()}
        </div>
        {renderContent()}
      </>
    )
  }
})
