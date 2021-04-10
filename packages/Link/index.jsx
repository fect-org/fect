import { computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { createNameSpace } from '../utils'
const [createComponent] = createNameSpace('Link')
import './link.less'

export default createComponent({
  props: {
    href: {
      type: String,
      default: '',
    },
    to: {
      type: [String, Object],
      default: () => {},
    },
    color: Boolean,
    underline: Boolean,
    block: Boolean,
  },
  setup(props, { attrs, slots }) {
    const { href, color, underline, block, to } = toRefs(props)
    const route = useRouter()

    const calcClass = computed(() => {
      let str = ''
      color.value && (str += ' color')
      underline.value && (str += ' underline')
      block.value && (str += ' block')
      return str.trim()
    })

    const safeHref = computed(() => {
      if (to.value) return 'javascript: void 0;'
      return href.value
    })

    const goToHandler = () => {
      if (to.value) route.push(to.value)
    }

    return () => (
      <>
        <a
          {...attrs}
          class={`fect-link ${calcClass.value}`}
          href={safeHref.value}
          onClick={goToHandler}
        >
          {slots.default?.()}
        </a>
      </>
    )
  },
})
