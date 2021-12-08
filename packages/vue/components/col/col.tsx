import { computed, ref, PropType, CSSProperties, defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import { RowProvide, READONLY_LAYOUT_KEY } from '../row/row'
import './index.less'

const name = createName('Col')

// set safe  distance
const useDistance = (value: number) => {
  const tempDistance = 100 / 24
  if (value >= 24) return '100%'
  return `${tempDistance * value}%`
}

export default defineComponent({
  name,
  props: {
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'div'
    },
    span: {
      type: [String, Number],
      default: 24
    },
    offset: {
      type: [String, Number],
      default: 0
    }
  },
  setup(props, { slots }) {
    const gutter = ref<string | number>(0)

    const { context } = useProvider<RowProvide>(READONLY_LAYOUT_KEY)

    if (context) {
      gutter.value = context.gutter
    }

    const setStyle = computed(() => {
      const { span, offset } = props
      const style: CSSProperties = {
        width: useDistance(Number(span)),
        marginLeft: useDistance(Number(offset)),
        paddingLeft: `${Number(gutter.value) / 2}px`,
        paddingRight: `${Number(gutter.value) / 2}px`
      }
      return style
    })

    return () => {
      const { tag } = props
      return (
        <tag style={setStyle.value} class="fect-col">
          {slots.default?.()}
        </tag>
      )
    }
  }
})
