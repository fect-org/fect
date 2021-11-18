import { defineComponent, computed, reactive, toRefs } from 'vue'
import { createProvider, useState } from '@fect-ui/vue-hooks'
import { READONLY_FORM_KEY } from './type'
import { props } from './props'
import { createName, ComponentInstance } from '../utils'

import './index.less'

const name = createName('Form')

export default defineComponent({
  name,
  props,
  setup(props, { slots, emit }) {
    const { provider, children } = createProvider<ComponentInstance>(READONLY_FORM_KEY)

    const pattern = computed(() => {
      const { size, disabledAll } = props
      const state = {
        size,
        disable: disabledAll,
      }
      return state
    })

    const labelState = computed(() => {
      const { inline, labelWidth, labelPosition, showMessage } = props
      const state = {
        inline,
        showMessage,
        labelPosition,
        labelWidth,
      }
      return state
    })

    provider({ labelState, pattern })

    return () => <form class="fect-form"> {slots.default?.()}</form>
  },
})
