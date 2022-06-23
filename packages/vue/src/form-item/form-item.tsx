import { defineComponent, ref, computed, Transition } from 'vue'
import { useState, useExpose } from '@fect-ui/vue-hooks'
import { useMounted } from '../composables'
import { createName, createBem, isArray, pickContextProps, pick, hasOwn, len, isDEV } from '../utils'
import { getLabelPostion, getLabelWidth } from '../form/style'
import { FormRule, Trigger, ValidateCallback } from '../form/interface'
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
    if (!context) {
      if (isDEV) console.error('[Fect] <FormItem /> must be a child component of <Form />')
      return
    }
    const { provider } = createFormItemContext()

    const formItemRef = ref<HTMLDivElement>()

    const [showLog, setShowLog] = useState<boolean>()

    const getFormItemState = computed(() => {
      const { labelWidth, labelPosition, showMessage, size, disabled } = pickContextProps(props, context, true)
      return { labelPosition, labelWidth, hidden: showMessage, size, disabled }
    })

    const getRules = (): FormRule[] => {
      const formRules = context.props.rules || {}
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
      const rul = rules.reduce((acc, cur) => (cur.message && acc.push(cur.message), acc), [] as string[])
      return rul[0]
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
        if (isDEV) console.error(`[Fect] <FormItem> prop is required for validate`)
        return
      }
      const { model } = context.props
      const rules = getRules()
      if (callback && !len(rules)) return callback(true, {})
      const { state, errs } = context.apollo.validateField(trigger, prop!, { [prop!]: model[prop!] })
      setShowLog(!state)
      return { state, errs }
    }

    const updateShowLogState = (state: boolean) => setShowLog(state)

    const clearValidate = () => setShowLog(false)

    const addField = () => {
      const { prop } = props
      if (prop) {
        const rules = getRules()
        context.apollo.addField(prop, rules)
      }
    }

    const removeField = () => {
      const { prop } = props
      if (prop) context.apollo.removeField(prop)
    }

    useMounted([addField, removeField])

    useExpose({ validate, clearValidate, updateShowLogState })

    provider({ behavior: getFormBehavior, validate })

    return () => (
      <div
        class={bem('item', {
          inline: context.props.inline,
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
          {getFormItemState.value.hidden && (
            <Transition name="form-fade">
              <div class={bem('error')} v-show={showLog.value}>
                <span>{getErrorLog.value}</span>
              </div>
            </Transition>
          )}
        </div>
      </div>
    )
  }
})
