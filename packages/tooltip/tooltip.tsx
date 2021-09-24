import { defineComponent, computed, ref, watch } from 'vue'
import {
  useState,
  createName,
  getPosition,
  useResize,
  useExpose,
  CustomCSSProperties,
} from '../utils'
import { useClickAway } from '@fect-ui/vue-hooks'
import { queryPlacement, queryArrowPlacement } from './style'
import { Teleport } from '../teleport'
import { props } from './props'
import { TooltipPosition } from './type'
import './index.less'

type IconOffset = 'x' | 'y'

const name = createName('Tooltip')

export default defineComponent({
  name,
  props,
  emits: ['change', 'update:visible'],
  setup(props, { slots, emit }) {
    const tooltipRef = ref<HTMLDivElement>()
    const contentRef = ref<HTMLDivElement>()
    const { width, height } = useResize()
    const [show, setShow] = useState<boolean>(props.visible)
    const [rect, setRect] = useState<TooltipPosition>({})
    const [iconOffset, setIconOffset] = useState<Record<IconOffset, string>>({})
    const [teleport, setTeleport] = useState<string>('body')

    const updateRect = () => {
      const { placement, offset } = props
      const rect = getPosition(tooltipRef)
      const position = queryPlacement(placement, rect, offset)
      setRect(position)
      const iconOffset = {
        x: `${rect.width / 2}px`,
        y: `${rect.height / 2}px`,
      }
      setIconOffset(iconOffset)
    }
    const setContentStyle = computed(() => {
      const style: CustomCSSProperties = {
        ['--tooltip-icon-offset-x']: iconOffset.value.x,
        ['--tooltip-icon-offset-y']: iconOffset.value.y,
        top: rect.value.top,
        left: rect.value.left,
        transform: rect.value.transform,
      }
      return style
    })

    const setArrowRect = computed(() => {
      const { placement } = props
      const x = 'var(--tooltip-icon-offset-x)'
      const y = 'var(--tooltip-icon-offset-y)'
      const rect = queryArrowPlacement(placement, x, y)

      const style: CustomCSSProperties = {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        transform: rect.transform,
      }
      return style
    })

    watch(show, updateRect)
    watch([width, height], updateRect)

    const preventHandler = (e: Event) => {
      e.stopPropagation()
      e.stopImmediatePropagation()
    }

    // render arrow Node
    const renderArrowIcon = () => (
      <span
        class={`fect-tooltip__arrow-icon ${props.type}`}
        style={setArrowRect.value}
      />
    )

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
          popupClass={`fect-tooltip__content ${portalClass} ${type}`}
          onPopupClick={preventHandler}
          style={setContentStyle.value}
          show={show.value}
          ref={contentRef}
          onMouseleave={() => mouseEventHandler(false)}
        >
          <div class="fect-tooltip__inner">
            {visibleArrow && renderArrowIcon()}
            {contentSlot ? contentSlot() : content}
          </div>
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

    const clickHandler = (state: boolean) =>
      props.trigger === 'click' && updateShow(state)

    const mouseEventHandler = (state: boolean) =>
      props.trigger === 'hover' && updateShow(state)

    useClickAway(() => clickHandler(false), tooltipRef)

    watch(show, (cur) => {
      emit('update:visible', cur)
      emit('change', cur)
    })

    useExpose({
      clickHandler,
      mouseEventHandler,
      setTeleport,
      updateRect,
    })

    return () => (
      <div
        class="fect-tooltip"
        ref={tooltipRef}
        onClick={() => clickHandler(!show.value)}
        onMouseenter={() => mouseEventHandler(true)}
        // onMouseleave={() => mouseEventHandler(false)}
      >
        {slots.default?.()}
        {renderContent()}
      </div>
    )
  },
})
