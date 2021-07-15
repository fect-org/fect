import {
  computed,
  CSSProperties,
  ref,
  Ref,
  watch,
  onUnmounted,
  onMounted,
  nextTick,
} from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { createNameSpace, useRect } from '../utils'
import { ComponentInstance } from '../utils/base'
import './index.less'

export const READONLY_SWIPE_KEY = 'swipeKey'

export type SwipeProvide = {
  index: Ref<number>
  height: Ref<number>
  width: Ref<number>
}

type Placement = 'prev' | 'next'

const [createComponent] = createNameSpace('Swipe')

export default createComponent({
  props: {
    duration: {
      type: Number,
      default: 4500,
    },
    autoplay: Number,
    loop: {
      type: Boolean,
      default: true,
    },
    indicatorWidth: {
      type: String,
      default: '8px',
    },
    indicatorHeight: {
      type: String,
      default: '8px',
    },
    initalValue: {
      type: Number,
      default: 0,
    },
    touchable: {
      type: Boolean,
      default: true,
    },
    showIndicators: {
      type: Boolean,
      default: true,
    },
    indicatorColor: String,
  },
  emits: ['change'],
  setup(props, { slots, emit }) {
    const { provider, children } = createProvider<ComponentInstance>(
      READONLY_SWIPE_KEY,
    )

    const swipeRef = ref<HTMLDivElement>()

    const index = ref<number>(0)

    const translate = ref<number>(0)

    const trackSize = ref<number>(0)

    const count = computed(() => children.length)

    const height = ref<number>(0)
    const width = ref<number>(0)
    const canSwipe = ref<boolean>(false)

    /**
     * set dom rect
     */
    onMounted(() => {
      const rect = useRect(swipeRef)
      height.value = rect.height
      width.value = rect.width
    })
    provider({
      index,
      width,
      height,
    })

    const calibrationPosition = (fn?: () => void) => {
      index.value = boundaryIndex(index.value + 1)
      //  const overLeft = translate.value >= size.value
      //       const overRight = translate.value <= -trackSize.value
      //       const leftTranslate = 0
      //       const rightTranslate = -(trackSize.value - size.value)
      // eslint-disable-next-line no-unused-expressions
      fn?.()
    }

    let timer: any

    const startAutoplay = () => {
      const { autoplay } = props
      if (!autoplay || count.value <= 1) return
      stopAutoPlay()
      timer = setTimeout(() => {
        translateUpdate('next')
        startAutoplay()
      }, autoplay)
    }

    const stopAutoPlay = () => timer && clearTimeout(timer)

    const translateUpdate = (type: Placement) => {
      if (count.value <= 1) return
      const { loop } = props
      const currentIndex = index.value

      calibrationPosition(() => {
        if (type === 'next') {
          // if (currentIndex === count.value - 1 && loop) {
          //   children[0].setTranslate(trackSize.value)
          //   translate.value = count.value * -width.value

          //   return
          // }
          // if (currentIndex !== count.value - 1) {
          //   translate.value = currentIndex * -width.value
          // }
          translate.value = currentIndex * -width.value
          return
        }

        if (type === 'prev') {
          // if (currentIndex === 0 && loop) {
          //   // children[0].setTranslate(-trackSize.value)
          //   translate.value = -width.value
          //   return
          // }
          // if (currentIndex !== 0) {
          //   translate.value = index.value * -width.value
          // }
          translate.value = index.value * -width.value
        }
      })
    }

    /**
     * indircator click Event
     */
    const indicatorHandler = (idx: number) => {
      if (count.value <= 1 || idx === index.value) return
      let status: Placement = 'prev'
      if (idx > index.value) status = 'next'
      index.value = idx
      translateUpdate(status)
    }

    const renderIndicator = () => {
      if (slots.indicator) {
        return slots.indicator()
      }
      if (props.showIndicators && count.value) {
        const style = (idx: number) => {
          const { indicatorColor, indicatorHeight, indicatorWidth } = props
          const active = index.value === idx
          return {
            backgroundColor: active ? indicatorColor : undefined,
            width: indicatorWidth,
            height: indicatorHeight,
          } as CSSProperties
        }

        return (
          <div class="fect-swipe__indicators">
            {[...new Array(count.value)].map((_, i) => (
              <span
                class={`fect-swipe__indicator ${
                  index.value === i ? 'active' : ''
                }`}
                style={style(i)}
                key={i}
                onClick={() => indicatorHandler(i)}
              ></span>
            ))}
          </div>
        )
      }
    }

    const boundaryIndex = (val: number): number => {
      const { loop } = props
      if (val < 0) {
        return loop ? count.value - 1 : 0
      }
      if (val > count.value - 1) {
        return loop ? 0 : count.value - 1
      }
      return val
    }

    const initialIndex = () => {
      canSwipe.value = true
      index.value = boundaryIndex(props.initalValue)
      // translate.value = index.value * -count.value
    }

    const initial = () => {
      nextTick(() => {
        trackSize.value = width.value * count.value
        children.map((swipe) => swipe.setTranslate(0))
        initialIndex()
        startAutoplay()
      })
    }

    watch(index, (pre) => emit('change', pre))

    watch(() => count.value, initial)

    onUnmounted(stopAutoPlay)

    const setTrackStyle = computed(() => {
      const style: CSSProperties = {
        height: `${height.value}px`,
        width: `${trackSize.value}px`,
        transform: `translateX(${translate.value}px)`,
        transitionDuration: '300ms',
      }
      return style
    })

    return () => (
      <div class="fect-swipe" ref={swipeRef}>
        <div class="fect-swipe__track" style={setTrackStyle.value}>
          {slots.default?.()}
        </div>
        {renderIndicator()}
      </div>
    )
  },
})
