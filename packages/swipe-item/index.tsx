import { computed, CSSProperties, ref } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createNameSpace, useExpose } from '../utils'
import { SwipeProvide, READONLY_SWIPE_KEY } from '../swipe'
import './index.less'

const [createComponent] = createNameSpace('SwipeItem')

export default createComponent({
  props: {},
  emits: ['click'],
  setup(props, { attrs, slots, emit }) {
    const { context } = useProvider<SwipeProvide>(READONLY_SWIPE_KEY)

    const translate = ref<number>(0)

    if (!context) {
      console.error(
        '[Fect] <SwipeItem /> must be a child component of <Swipe />',
      )
    }

    const setStyle = computed(() => {
      const style: CSSProperties = {
        height: '200px',
        width: '350px',
      }
      return style
    })

    return () => (
      <div class="fect-swipe-item" style={setStyle.value}>
        {slots.default?.()}
      </div>
    )
  },
})
