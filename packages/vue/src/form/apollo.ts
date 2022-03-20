import { proy as Proy } from 'proy'
import { isArray } from '../utils'
import type { FormRule, ValidateCallback, ValidateErrorParams } from './interface'

export class Apollo {
  fields: Map<string, FormRule[]> = new Map()
  proy = Proy()
  // invalidFields: ValidateErrorParams = {}
  private set(label: string, rule: FormRule[]) {
    this.fields.set(label, rule)
  }

  isEmpty() {
    return Boolean(!this.fields.size)
  }

  private remove(label: string) {
    this.fields.delete(label)
  }

  private get(label: string) {
    return this.fields.get(label)
  }

  private has(label: string) {
    return this.fields.has(label)
  }

  clearValiate(label: string) {
    this.get(label)
  }

  validate(label: string) {
    this.get(label)
  }

  validateAll(model: Record<string, any>, callback: ValidateCallback) {
    const invalidFields: ValidateErrorParams = {}
    this.fields.forEach((value, key) => {
      this.proy.descriptor({ [key]: value }).validate({ [key]: model[key] }, (errs) => {
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
  addField(field: string, rules: FormRule | FormRule[]) {
    const prevRules = this.get(field)
    const selfRules = isArray(rules) ? rules : [rules]
    if (prevRules) {
      this.set(field, [...selfRules, ...prevRules!])
      return
    }
    this.set(field, selfRules)
  }
  removeField(field: string) {
    this.remove(field)
  }
  validateField(field: string, model: Record<string, any>, callback?: ValidateCallback) {
    if (!this.has(field)) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[Fect] <FormItem> can not validate rules for non-existent field ${field}`)
        callback && callback(true, {})
      }
    }
    const rules = this.get(field)!
    rules.forEach((value, key) => {
      console.log(value)
      console.log(key)
    })
  }
}
