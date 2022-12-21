import { proy as Proy } from 'proy'
import { isArray, len } from '@fect-ui/shared'
import type { FormRule, Trigger, ValidateErrorParams } from './interface'

const pickRules = (trigger: Trigger, rules: FormRule[]) => {
  return rules.filter((rule) => {
    if (!rule.trigger || trigger === '') return true
    return rule.trigger === trigger
  })
}

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

  validateAll(model: Record<string, any>) {
    const invalidFields: ValidateErrorParams = {}
    this.fields.forEach((value, key) => {
      this.proy.descriptor({ [key]: value }).validate({ [key]: model[key] }, (errs) => {
        if (errs.length) invalidFields[key] = errs
      })
    })
    const state = !len(Object.keys(invalidFields))
    return { state, errs: invalidFields }
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
  validateField(trigger: Trigger, field: string, model: Record<string, any>) {
    if (!this.has(field)) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[Fect] <FormItem> can not validate rules for non-existent field ${field}`)
      }
    }
    const rules = pickRules(trigger, this.get(field)!)
    const invalid: ValidateErrorParams = {}
    rules.forEach((rule) => {
      this.proy.descriptor({ [field]: rule }).validate(model, (errs) => {
        if (len(errs)) invalid[field] = errs
      })
    })
    const state = !len(Object.keys(invalid))
    return { state, errs: invalid }
  }
}
