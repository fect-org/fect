import { createNameSpace } from '../utils'
const [createComponent] = createNameSpace('Code')
import './index.less'

export default createComponent({
  props: {
    block: Boolean,
  },
  setup(props, { slots }) {
    const isBlock = () => {
      return <code>{slots.default?.()}</code>
    }

    const normal = () => {
      return (
        <pre>
          <code>{slots.default?.()}</code>
        </pre>
      )
    }

    return () => {
      if (props.block) {
        return normal()
      }
      return isBlock()
    }
  },
})
