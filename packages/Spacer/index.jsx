import { computed, toRefs } from 'vue'
import { createNameSpace } from '../utils'
const [createComponent] = createNameSpace('Spacer')
import './spacer.less'
export default createComponent({
  props: {
    x: {
      type: [Number, String],
      default: 1,
    },
    y: {
      type: [Number, String],
      default: 1,
    },
    inline: Boolean,
  },
  setup(props, { attrs, slots, emit }) {
    const { x, y, inline } = toRefs(props)

    const getMargin = (num) => {
      if (num <= 0) {
        console.error(`[Spacer Error] ${num} should be greater than 0`)
        return
      }
      if (Number.isNaN(Number(num))) {
        console.error(`[Spacer Error] ${num} should be number`)
        return
      }
      return `calc(${num * 15.25}pt + 1px * ${num - 1})`
    }
    const marginTop = computed(() => getMargin(y.value))
    const marginLeft = computed(() => getMargin(x.value))
    return () => (
      <>
        <span
          {...attrs}
          className={`fect-spacer ${attrs.class ? attrs.class : ''}`}
          style={{
            marginTop: marginTop.value,
            marginLeft: marginLeft.value,
            display: inline.value ? 'inline-block' : 'block',
          }}
        ></span>
      </>
    )
  },
})
