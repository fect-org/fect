import { toRefs } from 'vue'
import { createNameSpace } from '../utils'
const [createComponent] = createNameSpace('Code')
import './code.less'

export default createComponent({
  props: {
    block: Boolean,
  },
  setup(props, { attrs, slots }) {
    const { block } = toRefs(props)
    const safeSlost = !!slots?.default

    const isBlock = () => {
      return <code {...attrs}>{safeSlost && slots.default()}</code>
    }

    const normal = () => {
      return (
        <pre {...attrs}>
          <code>{safeSlost && slots.default()}</code>
        </pre>
      )
    }

    return () => {
      if (block.value) {
        return normal()
      }
      return isBlock()
    }
  },
})
