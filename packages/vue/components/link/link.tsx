import { computed, defineComponent } from 'vue'
import { useRoute, createName } from '../utils'
import './index.less'

const name = createName('Link')

export default defineComponent({
  name,
  props: {
    href: {
      type: String,
      default: '',
    },
    to: {
      type: [String, Object],
      default: '',
    },
    color: Boolean,
    underline: Boolean,
    block: Boolean,
  },
  setup(props, { slots }) {
    const route = useRoute()

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

    const goToHandler = () => props.to && route()

    return () => (
      <a class={`fect-link ${setClass.value}`} href={safeHref.value} onClick={goToHandler}>
        {slots.default?.()}
      </a>
    )
  },
})
