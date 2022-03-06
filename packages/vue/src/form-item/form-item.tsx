import { defineComponent, ref, computed, reactive, toRefs, onMounted } from 'vue'
import { createName, createBem, isArray } from '../utils'
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

    const getRequired = computed(() => {
      const { required, prop } = props
      const { apollo } = context!
      if (!prop) return false
      if (required) return true
      const rules = apollo.get(prop)
      if (!rules) return false
      if (isArray(rules)) {
        return rules.some((_) => _.required)
      } else {
        return Boolean(rules.required)
      }
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
      const { formProps } = context!
      const style: CSSProperties = {}
      const labelPosition = getLabelPostion(props.labelPosition || formProps.labelPosition)
      if (!labelPosition) return style
      const labelWidth = getLabelWidth(props.labelWidth || formProps.labelWidth)
      style.width = labelWidth
      style.textAlign = labelPosition
      return style
    })

    const setFormItemClass = computed(() => {
      const { formProps } = context!
      const labelPosition = props.labelPosition || formItemProps.labelPosition
      return bem('item', [{ inline: formProps.inline }, labelPosition])
    })

    const setUnVerfiedClass = computed(() => {
      const { formProps } = context!
      const display = props.showMessage || formProps.showMessage
      return bem('error', { hidden: display })
    })

    /**
     * user may pass native attrs  for . so  we should intercept the attr
     */
    const setLabelFor = computed(() => props.prop || props.for)

    const setSize = computed(() => {
      const { formProps } = context!
      return formProps.size || props.size
    })

    const formItemProps = reactive({ ...toRefs(props), size: setSize.value })

    provider({ formItemProps })

    return () => (
      <div class={setFormItemClass.value} ref={formItemRef}>
        <label
          class={bem('label', { required: getRequired.value })}
          for={setLabelFor.value}
          style={setLabelStyle.value}
        >
          {props.label}
        </label>
        <div class={bem('content')}>
          {slots.default?.()}
          <div class={setUnVerfiedClass.value}>{getErrorLog.value}</div>
        </div>
      </div>
    )
  }
})
