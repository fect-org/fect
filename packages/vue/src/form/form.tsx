import { defineComponent, computed, reactive, toRefs, onBeforeUnmount, watch } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { props } from './props'
import { createName, useExpose, createBem, isPlainObject } from '../utils'
import { createFormContext } from './form-context'
import type { PromisfyValidate, ValidateCallback } from './interface'
import './index.less'
import { Apollo } from './apollo'

const name = createName('Form')
const bem = createBem('fect-form')

export default defineComponent({
  name,
  props,
  setup(props, { slots, emit }) {
    const { provider } = createFormContext()

    const apollo = new Apollo()

    // validate function call
    const validate = (callback?: ValidateCallback) => {
      if (!isPlainObject(props.model)) {
        if (process.env.NODE_ENV !== 'production') {
          return console.error('[Fect] <Form /> model is required for validate to work')
        }
      }
      let promise: Promise<PromisfyValidate> | undefined
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = (state, err) => {
            if (state) resolve(state)
            reject(err)
          }
        })
      }
      if (apollo.isEmpty() && callback) {
        return callback(true, {})
      }
      apollo.validateAll(props.model, callback!)
      if (promise) {
        return promise
      }
    }

    const resetField = () => {
      // apollo.invalidFields = {}
    }

    // watch(
    //   () => props.rules,
    //   (pre) => {
    //     Object.keys(pre).forEach((prop) => {
    //       apollo.set(prop, pre[prop])
    //     })
    //   },
    //   { immediate: true }
    // )

    // onBeforeUnmount(() => apollo.destory())

    useExpose({ validate, resetField })

    provider({ props, apollo })
    return () => <form class={bem(null, { inline: props.inline })}> {slots.default?.()}</form>
  }
})
