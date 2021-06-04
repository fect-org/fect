import { computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { createNameSpace } from '../utils'
import './link.less'

const [createComponent] = createNameSpace('Link')

export default createComponent({
  props: {
    href: {
      type: String,
      default: '',
    },
    to: {
      type: [String, Object],
      default: String,
    },
    color: Boolean,
    underline: Boolean,
    block: Boolean,
  },
  setup(props, { attrs, slots }) {
    const route = useRouter()

    const setClass = computed(() => {
      const names: string[] = []
      props.color && names.push('color')
      props.underline && names.push('underline')
      props.block && names.push('block')
      return names.join(' ')
    })

    const safeHref = computed(() => {
      if (props.to) return 'javascript: void 0;'
      return props.href
    })

    const goToHandler = () => {
      if (props.to) route.push(props.to)
    }

    return () => (
      <a
        class={`fect-link ${setClass.value}`}
        href={safeHref.value}
        onClick={goToHandler}
      >
        {slots.default?.()}
      </a>
    )
  },
})
