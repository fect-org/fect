import { proy } from 'proy'
import type { FormRule, ValidateCallback, ValidateErrorParams } from './interface'

export class Apollo {
  fields: Map<string, FormRule | FormRule[]> = new Map()
  // invalidFields: ValidateErrorParams = {}
  set(label: string, rule: FormRule | FormRule[]) {
    this.fields.set(label, rule)
  }

  isEmpty() {
    return Boolean(!this.fields.size)
  }

  remove(label: string) {
    this.fields.delete(label)
  }

  get(label: string) {
    return this.fields.get(label)
  }

  has(label: string) {
    return this.fields.has(label)
  }

  clearValiate(label: string) {
    this.get(label)
  }

  validate(label: string) {
    this.get(label)
  }

  validateAll(model: Record<string, any>, callback: ValidateCallback) {
    const pro = proy()
    const invalidFields: ValidateErrorParams = {}
    this.fields.forEach((value, key) => {
      pro.descriptor({ [key]: value }).validate({ [key]: model[key] }, (errs) => {
        if (errs.length) {
          invalidFields[key] = errs
        }
      })
    })
    if (Object.keys(invalidFields).length) {
      return callback(false, invalidFields)
    }
    return callback(true, {})
  }
  // destory All fields
  destory() {
    this.fields.forEach((_, key) => {
      if (this.has(key)) {
        this.remove(key)
      }
    })
  }
}
