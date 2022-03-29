import { defineComponent } from 'vue'
import { useExpose } from '@fect-ui/vue-hooks'
import { props } from './props'
import { createName, createBem, isPlainObject, len, isArray } from '../utils'
import { createFormContext } from './form-context'
import type { PromisfyValidate, ValidateCallback } from './interface'
import './index.less'
import { Apollo } from './apollo'

const name = createName('Form')
const bem = createBem('fect-form')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const { provider, children } = createFormContext()

    const apollo = new Apollo()

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
      if (apollo.isEmpty() && callback) return callback(true, {})
      const { state, errs } = apollo.validateAll(props.model)
      const errFields = Object.keys(errs)

      children.forEach((_) => {
        if (errFields.includes(_.prop)) {
          _.updateShowLogState(true)
        }
      })
      callback && callback(state, errs)
      if (promise) return promise
    }

    const validateField = (fields: string | string[], callback?: ValidateCallback) => {
      fields = isArray(fields) ? fields : [fields]
      const fds = children.filter((_) => fields.includes(_.prop))
      const result = fds.map((fd) => fd.validate('', callback))
      if (!len(result) && callback) return callback(true, {})
      result.forEach(({ state, errs }) => {
        callback && callback(state, errs)
      })
    }

    const clearValidate = (fields: string[] = []) => {
      const empty = !len(fields)
      const fds = children.filter((_) => {
        if (empty) return true
        return fields.includes(_.prop)
      })
      fds.forEach((fd) => fd.clearValidate())
    }

    useExpose({ validate, validateField, clearValidate })

    provider({ props, apollo })
    return () => <form class={bem(null, { inline: props.inline })}> {slots.default?.()}</form>
  }
})
