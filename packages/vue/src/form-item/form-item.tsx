import { defineComponent, ref, computed, onMounted, onBeforeMount } from 'vue'
import { createName, createBem, isArray, pickContextProps, pick, hasOwn, len, useExpose } from '../utils'
import { getLabelPostion, getLabelWidth } from '../form/style'
import { FormRule, Trigger, ValidateCallback, PromisfyValidate } from '../form/interface'
import { useFormContext, createFormItemContext } from '../form/form-context'
import { props } from './props'
import type { CSSProperties } from 'vue'

import './index.less'

const name = createName('FormItem')
const bem = createBem('fect-form')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const { context } = useFormContext()
    if (!context && process.env.NODE_ENV !== 'production') {
      console.error('[Fect] <FormItem /> must be a child component of <Form />')
      return
    }
    const { provider } = createFormItemContext()

    const formItemRef = ref<HTMLDivElement>()

    const getFormItemState = computed(() => {
      const { labelWidth, labelPosition, showMessage, size, disabled } = pickContextProps(props, context, true)
      return { labelPosition, labelWidth, hidden: showMessage, size, disabled }
    })

    const getRules = (): FormRule[] => {
      const formRules = context?.props.rules || {}
      const { rules, prop } = props
      if (prop && hasOwn(formRules, prop)) {
        const result = formRules[prop]
        let parentRules = []
        let selfRules = []
        if (result) parentRules = isArray(result) ? result : [result]
        if (rules) selfRules = isArray(rules) ? rules : [rules]
        return selfRules.concat(parentRules)
      }
      return []
    }

    const getRequired = computed(() => {
      const { required, prop } = props
      if (!prop) return false
      if (required) return true
      const rules = getRules()
      if (!len(rules)) return false
      return rules.some((_) => _.required)
    })

    const getErrorLog = computed(() => {
      const { prop } = props
      if (!prop) return []
      const rules = getRules()
      if (!len(rules)) return []
      return rules.reduce((acc, cur) => (cur.message && acc.push(cur.message), acc), [] as string[])
    })

    const setLabelStyle = computed(() => {
      const state = pick(getFormItemState.value, ['labelPosition', 'labelWidth'])
      const style: CSSProperties = {
        width: getLabelWidth(state.labelWidth),
        textAlign: getLabelPostion(state.labelPosition)
      }
      return style
    })

    /**
     * user may pass native attrs  for . so  we should intercept the attr
     */
    const setLabelFor = computed(() => props.prop || props.for)

    const getFormBehavior = computed(() => pick(getFormItemState.value, ['size', 'disabled']))

    /**
     * validate form value
     */
    const validate = (trigger: Trigger = 'change', callback?: ValidateCallback) => {
      const { prop } = props
      if (!prop) {
        if (process.env.NODE_ENV !== 'production') {
          return console.error(`[Fect] <FormItem> prop is required for validate`)
        }
      }
      let promise: Promise<PromisfyValidate> | undefined
      const { model } = context!.props
      const rules = getRules()
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = (state, err) => {
            if (state) resolve(state)
            reject(err)
          }
        })
      }
      if (callback && !len(rules)) return callback(true, {})
      context?.apollo.validateField(trigger, prop!, { [prop!]: model[prop!] }, callback)
      if (promise) return promise
    }

    onMounted(() => {
      const { prop } = props
      if (prop) {
        const rules = getRules()
        context?.apollo.addField(prop, rules)
      }
    })

    onBeforeMount(() => {
      const { prop } = props
      if (prop) context?.apollo.removeField(prop)
    })

    useExpose({ validate })

    provider({ behavior: getFormBehavior, validate })

    return () => (
      <div
        class={bem('item', {
          inline: context!.props.inline,
          ...pick(getFormItemState.value, ['labelPosition', 'size'])
        })}
        ref={formItemRef}
      >
        <label
          class={bem('label', { required: getRequired.value })}
          for={setLabelFor.value}
          style={setLabelStyle.value}
        >
          {props.label}
        </label>
        <div class={bem('content')}>
          {slots.default?.()}
          <div class={bem('error', { hidden: getFormItemState.value.hidden })}>{getErrorLog.value}</div>
        </div>
      </div>
    )
  }
})
