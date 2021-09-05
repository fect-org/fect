import {
  computed,
  CSSProperties,
  ref,
  watch,
  onUnmounted,
  onMounted,
  nextTick,
} from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { createNameSpace, useState, useRealShape } from '../utils'
import { ComponentInstance } from '../utils/base'
import { READONLY_SWIPE_KEY, Shape, Placement } from './type'
import { props } from './props'
import './index.less'

const [createComponent] = createNameSpace('Swipe')

export default createComponent({
  props,
  emits: ['change'],
  setup(props, { slots, emit }) {
    const parent = createProvider<ComponentInstance>(READONLY_SWIPE_KEY)
    const { provider, children } = parent

    const swipeRef = ref<HTMLDivElement>()
    /**  why not set initialValue as inital index ,
     *   because the props value may be overstep
     **/
    const [index, setIndex] = useState<number>(0)
    const [locked, setLocked] = useState<boolean>(false)
    const [translate, setTranslate] = useState<number>(0)
    const [trackSize, setTrackSize] = useState<number>(0)
    const [size, setSize] = useState<number>(0)

    //  children length
    const length = computed(() => children.length)

    provider({ index, trackSize, size })

    const boundaryIndex = (index: number) => {
      const { loop } = props
      const presetIdx = length.value - 1
      if (index < 0) return loop ? presetIdx : 0
      if (index > presetIdx) return loop ? 0 : presetIdx
      return index
    }

    const calibrationPosition = (fn?: () => void) => {
      const overLeft = translate.value >= size.value
      const overRight = translate.value <= -trackSize.value
      const leftTranslate = 0
      const rightTranslate = -(-trackSize.value - size.value)
      setLocked(true)
      if (overLeft || overRight) {
        setLocked(true)
        setTranslate(overRight ? leftTranslate : rightTranslate)
        children[0].setTranslate(0)
        children[length.value - 1].setTranslate(0)
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setLocked(false)
          // eslint-disable-next-line no-unused-expressions
          fn?.()
        })
      })
    }

    let timer: any

    const startAutoPlay = () => {
      const { autoplay } = props
      if (!autoplay || length.value <= 1) return
      stopAutoPlay()
      timer = setTimeout(() => {
        updateTranslate('next')
        startAutoPlay()
      }, autoplay)
    }

    const stopAutoPlay = () => timer && clearTimeout(timer)

    /**
     * control item direction
     */

    const next = (preidx: number, loop: boolean) => {
      calibrationPosition(() => {
        if (preidx === length.value - 1 && loop) {
          children[0].setTranslate(trackSize.value)
          setTranslate(length.value * -size.value)
          return
        }
        if (preidx !== length.value - 1) {
          setTranslate(index.value * -size.value)
        }
      })
    }

    const prev = (preidx: number, loop: boolean) => {
      calibrationPosition(() => {
        if (preidx === 0 && loop) {
          children[length.value - 1].setTranslate(-trackSize.value)
          setTranslate(size.value)
          return
        }
        if (preidx !== 0) {
          setTranslate(index.value * -size.value)
        }
      })
    }

    const updateTranslate = (type: Placement) => {
      if (length.value <= 1) return
      const { loop } = props
      const currentIndex = index.value
      const direction = type === 'next'
      const idx = direction
        ? boundaryIndex(currentIndex + 1)
        : boundaryIndex(currentIndex - 1)
      setIndex(idx)
      if (direction) return next(currentIndex, loop)
      return prev(currentIndex, loop)
    }

    /**
     * indircator click Event
     */
    const indicatorHandler = (idx: number) => {
      if (length.value <= 1 || idx === index.value) return
      idx = idx >= length.value ? length.value : idx
      const status: Placement = idx > index.value ? 'next' : 'prev'
      ;[...Array(Math.abs(idx - index.value))].map(() =>
        updateTranslate(status),
      )
    }

    const renderIndicator = () => {
      if (slots.indicator) {
        return slots.indicator()
      }
      const { indicatorDisplay } = props
      if (indicatorDisplay && length.value) {
        const setStyle = (idx: number) => {
          const active = index.value === idx
          const { indicatorColor, indicatorSize } = props
          return {
            backgroundColor: indicatorColor
              ? indicatorColor
              : 'var(--success-default)',
            width: indicatorSize,
            height: indicatorSize,
            opacity: active ? 1 : 0.3,
          } as CSSProperties
        }

        return (
          <div class="fect-swipe__indicators">
            {[...Array(length.value)].map((_, i) => (
              <span
                class="fect-swipe__indicator"
                style={setStyle(i)}
                key={i}
                onClick={() => indicatorHandler(i)}
              ></span>
            ))}
          </div>
        )
      }
    }

    const initializeIndex = () => {
      setLocked(true)
      const { initialValue } = props
      const index = Number(initialValue)
      const translate = index * -size.value
      setIndex(boundaryIndex(index))
      setTranslate(translate)
      requestAnimationFrame(() => {
        setLocked(false)
      })
    }

    /**
     * In this version we only provide horizontal
     */
    const resize = () => {
      nextTick(() => {
        const { width } = useRealShape(swipeRef) as Shape
        setSize(width)
        setTrackSize(width * length.value)
      })
      initializeIndex()
      startAutoPlay()
    }

    watch(index, (pre) => emit('change', pre))

    watch(() => length.value, resize)

    onMounted(() => {
      window.addEventListener('resize', resize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', resize)
      stopAutoPlay()
    })

    const setTrackStyle = computed(() => {
      const style: CSSProperties = {
        width: `${trackSize.value}px`,
        transform: `translateX(${translate.value}px)`,
        transitionDuration: locked.value ? '0ms' : `${props.duration}ms`,
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
