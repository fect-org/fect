import {
  computed,
  CSSProperties,
  ref,
  Ref,
  watch,
  watchEffect,
  onUnmounted,
} from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { createNameSpace, useRect } from '../utils'
import { ComponentInstance } from '../utils/base'
import './index.less'

export const READONLY_SWIPE_KEY = 'swipeKey'

export type SwipeProvide = {
  index: Ref<number>
}

type Move = {
  pace?: number
  offset?: number
  changeEvent?: boolean
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
  setup(props, { attrs, slots, emit }) {
    // <ComponentInstance>
    const { provider, children } = createProvider(READONLY_SWIPE_KEY)

    let starTime: number

    const swipeRef = ref<HTMLDivElement>()

    const index = ref<number>(0)

    const size = ref<number>(0)

    const translate = ref<number>(0)

    const trackSize = ref<number>(0)

    const count = computed(() => children.length)

    provider({
      index,
    })

    const calibrationPosition = (f?: () => void) => {
      const offsetLeft = translate.value >= size.value
      const offsetRight = translate.value <= -trackSize.value
      const leftTranslate = 0
      const rightTranslate = -(trackSize.value - size.value)
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

    // mobile event

    const handleTouchStar = (evt: TouchEvent) => {
      if (!props.touchable) return
      // eslint-disable-next-line prefer-destructuring
      const { clientX, clientY } = evt.touches[0]
      // state.starX = clientX
      // state.starY = clientY
      // console.log(state)
      starTime = Date.now()
      console.log(evt)
      stopAutoPlay()
    }

    const handleTouchMove = (evt: TouchEvent) => {
      if (props.touchable) {
      }
    }

    const handleTouchEnd = (evt: Event) => {
      if (!props.touchable) return
    }

    const translateUpdate = (type: Placement) => {
      if (count.value <= 1) return
      const { loop } = props
      const currentIndex = index.value
      console.log(type)
      calibrationPosition()
      // calibrationPosition(() => {})
    }

    /**
     * indircator click Event
     */
    const indicatorHandler = (idx: number) => {
      if (count.value <= 1 || idx === index.value) return
      let status: Placement = 'prev'
      if (idx > index.value) status = 'next'
      index.value = idx
      console.log(index.value)
      // translateUpdate(status)
    }

    const renderIndicator = () => {
      if (slots.indicator) {
        return slots.indicator()
      }
      if (props.showIndicators && count.value) {
        // when active set active color

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
        return children.length
      }
      if (val > children.length - 1) {
        return 0
      }
      return val
    }

    const initialIndex = () => {
      index.value = boundaryIndex(props.initalValue)
      translate.value = index.value * -count.value
    }

    const initial = () => {
      const rect = useRect(swipeRef)

      if (rect.width) {
        size.value = rect.width
        trackSize.value = rect.width * count.value
        // initialIndex()
        // startAutoplay()
      }
    }

    watch(index, (pre) => emit('change', pre))

    watchEffect(initial)

    onUnmounted(stopAutoPlay)

    const setTrackStyle = computed(() => {
      const rect = useRect(swipeRef)
      const offset = index.value * size.value

      const style: CSSProperties = {
        height: `${rect.height}px`,
        width: `${trackSize.value}px`,
        transform: `translateX(-${offset}px)`,
        transitionDuration: '300ms',
      }
      return style
    })

    return () => (
      <div class="fect-swipe" ref={swipeRef}>
        <div
          class="fect-swipe__track"
          onTouchstart={handleTouchStar}
          onTouchmove={handleTouchMove}
          onTouchend={handleTouchEnd}
          onTouchcancel={handleTouchEnd}
          style={setTrackStyle.value}
        >
          {slots.default?.()}
        </div>
        {renderIndicator()}
      </div>
    )
  },
})
