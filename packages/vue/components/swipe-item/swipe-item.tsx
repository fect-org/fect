import { computed, CSSProperties, defineComponent } from 'vue'
import { useProvider, useState } from '@fect-ui/vue-hooks'
import { createName, useExpose } from '../utils'
import { SwipeProvide, READONLY_SWIPE_KEY } from '../swipe/type'
import './index.less'

const name = createName('SwipeItem')

export default defineComponent({
  name,
  emits: ['click'],
  setup(props, { attrs, slots, emit }) {
    const { context } = useProvider<SwipeProvide>(READONLY_SWIPE_KEY)

    const [translate, setTranslate] = useState<number>(0)

    if (!context) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Fect] <SwipeItem /> must be a child component of <Swipe />')
      }
      return
    }

    const setStyle = computed(() => {
      const { size } = context!
      const style: CSSProperties = {
        width: `${size.value}px`,
        transform: `translateX(${translate.value}px)`,
      }
      return style
    })

    const clickHandler = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      emit('click', e)
    }

    useExpose({ setTranslate })

    return () => (
      <div class="fect-swipe-item" style={setStyle.value} onClick={clickHandler}>
        {slots.default?.()}
      </div>
    )
  },
})
