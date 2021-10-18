import { PropType, defineComponent, computed, ref, CSSProperties } from 'vue'
import { createName, useState, useExpose, useRect } from '../utils'
import { useEventListener } from '@fect-ui/vue-hooks'

import './index.less'

const name = createName('BackTop')

export type ScrollTarget = HTMLElement | Window

export type Place = 'x' | 'y'

interface ScrollToOptions {
  /** Scroll container, default as window */
  getContainer?: () => ScrollTarget
  duration?: number
  scrollTopTimer?: any
}

export default defineComponent({
  name,
  props: {
    duration: {
      type: Number,
      default: 4,
    },
    target: {
      type: Function as PropType<() => HTMLElement | Window>,
      default: () => window,
    },
    visibilityHeight: {
      type: Number,
      default: 200,
    },
    right: {
      type: Number,
      default: 40,
    },
    bottom: {
      type: Number,
      default: 40,
    },
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const ButtonRef = ref<HTMLElement>()

    const [visible, setVisible] = useState<boolean>(false)

    const isWindow = (obj: any) => {
      return obj !== null && obj !== undefined && obj === obj.window
    }

    const handleScroll = (target: ScrollTarget) => {
      const scrollTop = getScroll(target, 'y')
      setVisible(scrollTop > props.visibilityHeight)
    }

    const getScroll = (target: ScrollTarget, place: Place) => {
      if (typeof window === 'undefined') return 0

      if (isWindow(target)) {
        target = target as Window
        const offset = place === 'y' ? 'scrollY' : 'scrollX'
        return target[offset]
      }
      const { top, left } = useRect(target as HTMLElement)
      const { offsetTop } = target as HTMLElement
      if (place === 'y') return Math.abs(top) - offsetTop
      return Math.abs(left)
    }

    const scrollTo = (y: number, options: ScrollToOptions) => {
      // default as window
      const { getContainer } = options

      const container = getContainer && getContainer()
      const scrollTop = getScroll(container!, 'y')
      const slice = scrollTop / props.duration
      const nextScrollTop = scrollTop - slice

      window.scrollTo({
        top: nextScrollTop,
      })

      if (scrollTop !== 0) {
        let scrollTopTimer: any = null
        clearTimeout(scrollTopTimer)
        scrollTopTimer = setTimeout(() => {
          return scrollTo(0, {
            getContainer: props.target,
            duration: props.duration,
          })
        }, 30)
      }
    }

    const scrollToTopHandler = (e: MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      scrollTo(0, {
        getContainer: props.target,
        duration: props.duration,
      })

      emit('click', e)
    }

    /**
     * regist scroll event on window ,
     * when scroll to a distance , the component will be visible
     */
    useEventListener('scroll', () => {
      if (!ButtonRef.value) return
      const { target } = props
      const container = target() || ButtonRef.value.ownerDocument
      handleScroll(container)
    })

    useExpose({ handleScroll })

    const positionStyle = computed(() => {
      const { right, bottom } = props
      const style: CSSProperties = {
        right: `${right}px`,
        bottom: `${bottom}px`,
      }
      return style
    })

    const renderNode = () => {
      // when slots.prev is exists, it will use custom prve render
      const customSlot = slots['default']
      return (
        <>
          {customSlot ? (
            customSlot()
          ) : (
            <div class="fect-back-top__content">
              <span class="fect-back-top__icon">
                <svg viewBox="64 64 896 896" width="1.5rem" height="1.5rem" fill="currentColor" aria-hidden="true">
                  <path d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"></path>
                </svg>
              </span>
            </div>
          )}
        </>
      )
    }

    return () => (
      <div
        class={`fect-back-top ${visible.value ? 'focus' : ''}`}
        ref={ButtonRef}
        style={positionStyle.value}
        onClick={scrollToTopHandler}
      >
        {visible.value && renderNode()}
      </div>
    )
  },
})
