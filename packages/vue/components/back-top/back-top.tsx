import { PropType, defineComponent, computed, ref, CSSProperties } from 'vue'
import { createName, useState, useExpose, isBrowser } from '../utils'
import { useEventListener } from '@fect-ui/vue-hooks'

import './index.less'

const name = createName('BackTop')

export type ScrollTarget = HTMLElement | Document | Window

export type Position = 'vertical' | 'horizontal'

export default defineComponent({
  name,
  props: {
    duration: {
      type: Number,
      default: 4,
    },
    target: {
      type: Function as PropType<() => ScrollTarget>,
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
    const buttonRef = ref<HTMLDivElement>()

    const [visible, setVisible] = useState<boolean>(false)

    const isHTMLElement = (el: ScrollTarget) => el instanceof HTMLElement

    const isDocument = (el: ScrollTarget) => el instanceof Document

    // get target distance
    const getDistance = (target: ScrollTarget, position: Position = 'vertical') => {
      const browser = isBrowser()
      if (!browser) return 0
      const elementOrDocument = isHTMLElement(target) || isDocument(target)
      const getOffset = () => {
        if (elementOrDocument) return position === 'vertical' ? 'scrollTop' : 'scrollLeft'
        return position === 'vertical' ? 'scrollY' : 'scrollX'
      }
      const offset = getOffset()
      if (isHTMLElement(target)) {
        target = target as HTMLElement
        return target[offset as 'scrollTop' | 'scrollLeft']
      }
      if (isDocument(target)) {
        target = target as Document
        return target.documentElement[offset as 'scrollTop' | 'scrollLeft']
      }
      target = target as Window
      return target[offset as 'scrollY' | 'scrollX']
    }

    const scrollHandler = () => {
      const target = props.target()
      console.log(target)
      const distance = getDistance(target, 'vertical')
      setVisible(distance > props.visibilityHeight)
    }

    const scrollTop = () => {
      const target = props.target()
      const distance = getDistance(target, 'vertical')
      const slice = distance / props.duration
      const nextDistance = distance - slice
      if (target instanceof Window) {
        window.scrollTo({
          top: nextDistance,
        })
      }
      if (isDocument(target)) {
        ;(target as Document).documentElement.scrollTop = nextDistance
      }
      if (isHTMLElement(target)) {
        ;(target as HTMLElement).scrollTop = nextDistance
      }
      if (distance !== 0) {
        let scrollTopTimer: any = null
        clearTimeout(scrollTopTimer)
        scrollTopTimer = setTimeout(scrollTop, 20)
      }
    }

    const scrollToTopHandler = (e: MouseEvent) => {
      if (!visible.value) return
      e.stopPropagation()
      e.preventDefault()
      scrollTop()

      emit('click', e)
    }

    /**
     * regist scroll event
     * when scroll to a distance , the component will be visible
     */

    useEventListener('scroll', scrollHandler, { target: props.target() })

    useExpose({ scrollHandler, setVisible })

    const setStyle = computed(() => {
      const { right, bottom } = props
      const style: CSSProperties = {
        right: `${right}px`,
        bottom: `${bottom}px`,
      }
      return style
    })

    const renderNode = () => {
      const customSlot = slots['default']

      if (customSlot) return customSlot()
      return (
        <div class="fect-back-top__content">
          <span class="fect-back-top__icon">
            <svg viewBox="64 64 896 896" width="1.5rem" height="1.5rem" fill="currentColor" aria-hidden="true">
              <path d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"></path>
            </svg>
          </span>
        </div>
      )
    }

    return () => (
      <div
        class={`fect-back-top ${visible.value ? 'focus' : ''}`}
        ref={buttonRef}
        style={setStyle.value}
        onClick={scrollToTopHandler}
      >
        {visible.value && renderNode()}
      </div>
    )
  },
})
