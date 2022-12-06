import { defineComponent } from 'vue'
import { createButtonGroupContext } from './button-group-context'
import { createBem, createName } from '../utils'
import { buttonGroupProps } from './props'

import './index.less'

const name = createName('ButtonGroup')
const bem = createBem('fect-button')

export default defineComponent({
  name,
  props: buttonGroupProps,
  setup(props, { slots }) {
    const { provider } = createButtonGroupContext()

    provider({ props })

    return () => <div class={bem('group', props.vertical ? 'vertical' : 'horizontal')}>{slots.default?.()}</div>
  }
})
