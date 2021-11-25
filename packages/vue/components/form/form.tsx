import { defineComponent, computed, reactive, toRefs, watchEffect } from 'vue'
import { createProvider, useState } from '@fect-ui/vue-hooks'
import { READONLY_FORM_KEY } from './type'
import { proy } from 'proy'
import { props } from './props'
import { createName, useExpose } from '../utils'
import type { ComponentInstance } from '../utils'
import type { ValidateCallBack, CallbackErrors } from 'proy'

import './index.less'

const name = createName('Form')

export default defineComponent({
  name,
  props,
  setup(props, { slots, emit }) {
    const { provider } = createProvider<ComponentInstance>(READONLY_FORM_KEY)

    const formProps = reactive({ ...toRefs(props) })

    useExpose({})

    provider({ formProps })

    return () => <form class={`fect-form ${props.inline ? 'is-inline' : ''}`}> {slots.default?.()}</form>
  },
})
