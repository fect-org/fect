import { computed, CSSProperties, reactive, ref } from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { createNameSpace } from '../utils'
import './index.less'

export const READONLY_SWIPE_KEY = 'swipeKey'

export type SwipeProvide = {
  width: number
  height: number
}

const [createComponent] = createNameSpace('Swipe')

export default createComponent({
  props: {
    duration: {
      type: [Number, String],
      default: 4500,
    },
    autoplay: [String, Number],
    loop: Boolean,
    width: String,
    height: String,
    initalSwipe: {
      type: Number,
      default: 0,
    },
    touchable: {
      type: Boolean,
      default: true,
    },
    vertical: Boolean,
    showIndicators: {
      type: Boolean,
      default: true,
    },
    indicatorColor: String,
  },
  emits: ['change'],
  setup(props, { attrs, slots, emit }) {
    const swipeRef = ref<HTMLDivElement>()
    // const size = ref<>()
    const index = ref<number>(0)
    const translate = ref<number>(0)

    const state = reactive({
      starX: 0,
      starY: 0,
    })

    const setTrackStyle = computed(() => {
      const { vertical } = props

      const style: CSSProperties = {
        // width: vertical ? 'auto' : null,
      }
      return style
    })

    const handleTouchStar = (evt: TouchEvent) => {
      if (!props.touchable) return
      // eslint-disable-next-line prefer-destructuring
      const { clientX, clientY } = evt.touches[0]
      state.starX = clientX
      state.starY = clientY
      console.log(state)
    }

    const handleTouchEnd = (evt: Event) => {
      if (!props.touchable) return
    }

    return () => (
      <div class="fect-swipe" ref={swipeRef}>
        <div
          class="fect-swipe__track"
          onTouchstart={handleTouchStar}
          onTouchend={handleTouchEnd}
        >
          {slots.default?.()}
        </div>
        <div class="fect-swipe__indicators">
          <span class="fect-swipe__indicator"></span>
        </div>
      </div>
    )
  },
})
