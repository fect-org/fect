import { defineComponent, computed, reactive, toRefs, onBeforeUnmount, watch } from 'vue'
import { props } from './props'
import { createName, useExpose, createBem, isPlainObject, pick } from '../utils'
import { createFormContext } from './form-context'
import type { PromisfyValidate, ValidateCallback } from './interface'
import './index.less'
import { Apollo } from './apollo'
import { isArray } from '@vue/shared'

const name = createName('Form')
const bem = createBem('fect-form')

export default defineComponent({
  name,
  props,
  setup(props, { slots, emit }) {
    const { provider, children } = createFormContext()

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

    const validateField = (fields: string | string[], callback?: ValidateCallback) => {
      fields = isArray(fields) ? fields : [fields]
      const fds = children.filter((_) => fields.includes(_.prop))
      return Promise.all(fds.map((fd) => fd.validate('', callback)))
    }

    const resetField = () => {
      // apollo.invalidFields = {}
    }

    useExpose({ validate, validateField, resetField })

    provider({ props, apollo })
    return () => <form class={bem(null, { inline: props.inline })}> {slots.default?.()}</form>
  }
})
