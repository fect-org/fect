import { computed, ref, toRefs } from 'vue'
import { createNameSpace, useProvider } from '../utils'
const [createComponent] = createNameSpace('Col')
import './col.less'

const READONLY_LAYOUT_KEY = 'layoutKey'

//calculate tag safe distance

const useDistance = (value) => {
  if (typeof value === 'string') Number(value)

  const tempDistance = 100 / 24
  if (value >= 24) return '100%'
  return `${tempDistance * value}%`
}

export default createComponent({
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    span: {
      type: [String, Number],
      default: 24,
    },
    offset: {
      type: [String, Number],
      default: 0,
    },
  },
  setup(props, { attrs, slots }) {
    const { tag, span, offset } = toRefs(props)
    const gutter = ref(null)
    const { ctx } = useProvider(READONLY_LAYOUT_KEY)
    if (ctx) {
      gutter.value = ctx.gutter.value
    }

    const calcStyle = computed(() => {
      const style = {}
      style.width = useDistance(span.value)
      style.marginLeft = useDistance(offset.value)
      style.paddingLeft = `${gutter.value / 2}px`
      style.paddingRight = style.paddingLeft
      return style
    })

    const safeClass = computed(() => {
      let _class = ''
      if (attrs.class) {
        _class = attrs.class ? attrs.class : ''
        return _class
      }
      _class = attrs.className ? attrs.className : ''
      return _class
    })

    return () => (
      <>
        <tag.value
          {...attrs}
          style={calcStyle.value}
          // ${attrs?.class ? attrs.class : ''}
          className={`fect-col  ${safeClass.value}`}
        >
          {slots.default?.()}
        </tag.value>
      </>
    )
  },
})
