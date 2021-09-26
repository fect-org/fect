import { PropType, defineComponent, computed, ref, onMounted, onBeforeUnmount, CSSProperties } from 'vue'
import { createName, useState, useExpose } from '../utils'
import { useEventListener } from '@fect-ui/vue-hooks'

import './index.less'

const name = createName('BackTop')

interface ScrollToOptions {
  /** Scroll container, default as window */
  getContainer?: () => HTMLElement | Window | Document;
  duration?: number;
  scrollTopTimer?: any;
}

export default defineComponent({
  name,
  props: {
    duration: Number,
    target: Function as PropType<() => (HTMLElement | Window | Document)>,
    visibilityHeight: Number,
    right: Number,
    bottom: Number,
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const ButtonRef = ref<HTMLElement>()
    const duration = computed(() => {
      const { duration = 4 } = props
      return Number(duration)
    })
    const visibilityHeight = computed(() => {
      const { visibilityHeight = 200 } = props
      return Number(visibilityHeight)
    })
    const [visible, setVisible] = useState<boolean>(visibilityHeight.value < 50)
    
    const isWindow = (obj: any) => {
      return obj !== null && obj !== undefined && obj === obj.window;
    }

    const getDefaultTarget = () =>
      ButtonRef.value ? ButtonRef.value.ownerDocument : window

    const handleScroll = (e: Event | { target: any }) => {
      const scrollTop = getScroll(e.target, true)
      setVisible(scrollTop > visibilityHeight.value)
    }

    const getScroll = (
      target: HTMLElement | Window | Document | null,
      top: boolean,
    ) => {
      if (typeof window === 'undefined') {
        return 0;
      }
      const method = top ? 'scrollTop' : 'scrollLeft';
      let result = 0
      if (isWindow(target)) {
        result = (target as Window)[top ? 'pageYOffset' : 'pageXOffset']
      } else if (target instanceof Document) {
        result = target.documentElement[method]
      } else if (target) {
        result = (target as HTMLElement)[method]
      }
      if (target && !isWindow(target) && typeof result !== 'number') {
        result = ((target as HTMLElement).ownerDocument || (target as Document)).documentElement?.[
          method
        ]
      }
      return result
    }

    const scrollTo = (y: number, options: ScrollToOptions) => {
      const { getContainer = () => window } = options
      const container = getContainer()
      const scrollTop = getScroll(container, true)
      const nextScrollTop = scrollTop - (scrollTop / duration.value);

      if (isWindow(container)) {
        (container as Window).scrollTo(window.pageXOffset, nextScrollTop)
      } else if (container instanceof HTMLDocument || container.constructor.name === 'HTMLDocument') {
        (container as HTMLDocument).documentElement.scrollTop = nextScrollTop
      } else {
        (container as HTMLElement).scrollTop = nextScrollTop
      }
      if (scrollTop !== 0) {
        let scrollTopTimer: any = null;
        clearTimeout(scrollTopTimer);
        scrollTopTimer = setTimeout(() => scrollTo(0, {
          getContainer: props.target || getDefaultTarget,
          duration: duration.value,
        }), 30)
      }
    }

    const scrollToTopHandler = (e: MouseEvent) => {
      scrollTo(0, {
        getContainer: props.target || getDefaultTarget,
        duration: duration.value,
      })
      
      emit('click', e)
    }

    useEventListener(
      'scroll',
      (e: Event) => handleScroll(e),
    ) 

    useExpose({ handleScroll })

    onMounted(() => {
      const { target } = props
      const getTarget = target || getDefaultTarget
      const container = getTarget()

      handleScroll({
        target: container,
      })
    })

    const positionStyle = computed(() => {
      const { right = 40, bottom = 40 } = props
      const style: CSSProperties = {
        right: `${right}px`,
        bottom: `${bottom}px`,
      }
      return style
    })

    const renderCustom = () => {
      // when slots.prev is exists, it will use custom prve render
      const customSlot = slots.default
      return (
        <>
          {customSlot ? (
            customSlot()
          ) : (
            <div class="fect-back-top__content">
              <span class="fect-back-top__icon">
                <svg viewBox="64 64 896 896" width="1.5rem" height="1.5rem" fill="currentColor" aria-hidden="true">
                  <path
                    d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"
                  >
                  </path>
                </svg>
              </span>
            </div>
          )}
        </>
      )
    }

    return () => (
      <div 
        class="fect-back-top"
        ref={ButtonRef}
        style={positionStyle.value}
        onClick={scrollToTopHandler}
      >
        {visible.value && renderCustom()}
      </div>
    )
  },
})
