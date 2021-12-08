import { defineComponent } from 'vue'
import { createName } from '../utils'

import './index.less'

const name = createName('Code')

export default defineComponent({
  name,
  props: {
    block: Boolean
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
  }
})
