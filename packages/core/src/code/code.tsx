import { defineComponent } from 'vue'
import { createName, createBem } from '../utils'

import './index.less'

const name = createName('Code')

const bem = createBem('fect-code')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    block: Boolean,
    name: String,
    classic: Boolean
  },
  setup(props, { slots, attrs }) {
    return () => {
      if (!props.block) return <code {...attrs}>{slots.default?.()}</code>
      const { name, classic } = props
      return (
        <div class={bem('pre', { classic })}>
          {name && <header class={bem('name')}>{name}</header>}
          <pre {...attrs}>{slots.default?.()}</pre>
        </div>
      )
    }
  }
})
