import { defineComponent } from 'vue'
import { createButtonGroupContext } from './button-group-context'
import { createBem, createName } from '../utils'
import { buttonGroupProps } from './props'

import './index.less'

const name = createName('ButtonGroup')

export default defineComponent({
  name,
  props: buttonGroupProps,
  setup(props, { slots }) {
    const { provider } = createButtonGroupContext()

    provider({ props })

    return () => (
      <div class={`fect-button__group ${createBem('fect-button__group', props.vertical ? 'vertical' : 'horizontal')}`}>
        {slots.default?.()}
      </div>
    )
  }
})
