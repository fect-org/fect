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

    const formProps = reactive({ ...toRefs(props) })

    provider({ formProps })

    return () => <form class={`fect-form ${props.inline ? 'is-inline' : ''}`}> {slots.default?.()}</form>
  },
})
