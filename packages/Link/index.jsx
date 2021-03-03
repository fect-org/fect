import { computed, toRefs } from 'vue'
import { createNameSpace } from '../utils'
const [createComponent] = createNameSpace('Link')
import './link.less'

export default createComponent({
  props: {
    href: {
      type: String,
      default: '',
    },
    color: Boolean,
    underline: Boolean,
    block: Boolean,
  },
  setup(props, { attrs, slots, emit }) {
    const { href, color, underline, block } = toRefs(props)
    const safeSlots = !!slots?.default
    const calcClass = computed(() => {
      let str = ''
      color.value && (str += ' color')
      underline.value && (str += ' underline')
      block.value && (str += ' block')
      return str.trim()
    })

    return () => (
      <>
        <a
          {...attrs}
          className={`fay-link ${calcClass.value}`}
          href={href.value}
        >
          {safeSlots && slots.default()}
        </a>
      </>
    )
  },
})
