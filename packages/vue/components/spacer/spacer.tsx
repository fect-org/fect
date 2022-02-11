import { computed, defineComponent } from 'vue'
import { createName } from '../utils'
import type { CustomCSSProperties } from '../utils'
import './index.less'

const name = createName('Spacer')

const getMargin = (num: any) => {
  const env = process.env.NODE_ENV !== 'production'
  if (num <= 0 && env) {
    console.error(`[Fect] Spacer Error ${num} should be greater than 0`)
    num = 1
  }
  if (typeof num !== 'number' && env) {
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
      const style: CustomCSSProperties = {
        '--horizontal-num': getMargin(props.x),
        '--vertical-num': getMargin(props.y)
      }
      return style
    })

    return () => <span class={`fect-spacer ${props.inline ? 'fect-spacer--inline' : ''}`} style={setStyle.value}></span>
  }
})
