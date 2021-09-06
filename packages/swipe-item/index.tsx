import { computed, CSSProperties } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createNameSpace, useExpose, useState } from '../utils'
import { SwipeProvide, READONLY_SWIPE_KEY } from '../swipe/type'
import './index.less'

const [createComponent] = createNameSpace('SwipeItem')

export default createComponent({
  emits: ['click'],
  setup(props, { attrs, slots, emit }) {
    const { context } = useProvider<SwipeProvide>(READONLY_SWIPE_KEY)

    const [translate, setTranslate] = useState<number>(0)

    if (!context) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          '[Fect] <SwipeItem /> must be a child component of <Swipe />',
        )
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
      <div
        class="fect-swipe-item"
        style={setStyle.value}
        onClick={clickHandler}
      >
        {slots.default?.()}
      </div>
    )
  },
})
