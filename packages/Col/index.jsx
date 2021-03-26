import { computed, toRefs } from 'vue'
import { createNameSpace } from '../utils'
const [createComponent] = createNameSpace('Col')
import './col.less'

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

    const calcStyle = computed(() => {
      const style = {}
      style.width = useDistance(span.value)
      style.marginLeft = useDistance(offset.value)
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
