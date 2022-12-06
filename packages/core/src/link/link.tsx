import { computed, defineComponent } from 'vue'
import { createName, createBem } from '../utils'
import { useRoute } from '../composables'
import './index.less'

const name = createName('Link')
const bem = createBem('fect-link')

export default defineComponent({
  name,
  props: {
    href: {
      type: String,
      default: ''
    },
    to: {
      type: [String, Object],
      default: ''
    },
    color: Boolean,
    underline: Boolean,
    block: Boolean
  },
  setup(props, { slots }) {
    const route = useRoute()

    const setLinkClass = computed(() => {
      const { color, underline, block } = props
      return bem(null, { color, underline, block })
    })

    const safeHref = computed(() => {
      if (props.to) return 'javascript: void 0;'
      return props.href
    })

    const goToHandler = () => props.to && route?.push(props.to)

    return () => (
      <a class={setLinkClass.value} href={safeHref.value} onClick={goToHandler}>
        {slots.default?.()}
      </a>
    )
  }
})
