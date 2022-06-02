import { computed, defineComponent } from 'vue'
import { createName, createBem, isDEV } from '../utils'
import type { CSSProperties } from '../utils'
import './index.less'

const name = createName('Spacer')
const bem = createBem('fect-spacer')

const getMargin = (num: any) => {
  if (num <= 0 && isDEV) {
    console.error(`[Fect] Spacer Error ${num} should be greater than 0`)
    num = 1
  }
  if (typeof num !== 'number' && isDEV) {
    console.error(`[Fect] Spacer Error ${num} should be number`)
    num = 1
  }
  // use for ssr.
  return `calc(${num} - 0)`
}

export default defineComponent({
  name,
  props: {
    x: {
      type: [Number],
      default: 1
    },
    y: {
      type: [Number],
      default: 1
    },
    inline: Boolean
  },
  setup(props) {
    const setStyle = computed(() => {
      const style: CSSProperties = {
        '--horizontal-num': getMargin(props.x),
        '--vertical-num': getMargin(props.y)
      }
      return style
    })

    return () => <span class={bem(null, { inline: props.inline })} style={setStyle.value}></span>
  }
})
