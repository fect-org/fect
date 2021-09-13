import { computed, CSSProperties, defineComponent } from 'vue'
import { createName } from '../utils'
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
  return `calc(${num * 15.25}pt + 1px * ${num - 1})`
}

export default defineComponent({
  name,
  props: {
    x: {
      type: [Number],
      default: 1,
    },
    y: {
      type: [Number],
      default: 1,
    },
    inline: Boolean,
  },
  setup(props) {
    const setStyle = computed(() => {
      const marginTop = getMargin(props.y)
      const marginLeft = getMargin(props.x)
      const { inline } = props
      const style: CSSProperties = {
        marginTop,
        marginLeft,
        display: inline ? 'inline-block' : 'block',
      }
      return style
    })

    return () => <span class="fect-spacer" style={setStyle.value}></span>
  },
})
