import { defineComponent, ref, computed, onMounted } from 'vue'
import { createName, createBem, isArray, pickContextProps, pick } from '../utils'
import { getLabelPostion, getLabelWidth } from '../form/style'
import { Trigger } from '../form/interface'
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

    const getRequired = computed(() => {
      const { required, prop } = props
      const { apollo } = context!
      if (!prop) return false
      if (required) return true
      const rules = apollo.get(prop)
      if (!rules) return false
      if (isArray(rules)) return rules.some((_) => _.required)
      return Boolean(rules.required)
    })

    const getErrorLog = computed(() => {
      const { prop } = props
      const { apollo } = context!
      if (!prop) return []
      const rules = apollo.get(prop)
      if (!rules) return []
      if (isArray(rules)) {
        return rules.reduce((acc, cur) => (acc = acc.concat(cur.message || '')), [] as string[])
      }
      return ([] as string[]).concat(rules.message || '')
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

    provider({ behavior: getFormBehavior })

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
