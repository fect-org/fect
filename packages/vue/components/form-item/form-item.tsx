import { defineComponent, ref, computed, CSSProperties } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import FormItemWrapper from './form-item-wrapper'
import { props } from './props'
import { getLabelPostion, getLabelWidth, getFormItemLayoutClass } from '../form/style'
import { FormProvide, READONLY_FORM_KEY } from '../form/type'

import './index.less'

const name = createName('FormItem')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const { context } = useProvider<FormProvide>(READONLY_FORM_KEY)

    if (!context && process.env.NODE_ENV !== 'production') {
      console.error('[Fect] <FormItem /> must be a child component of <Form />')
      return
    }

    const formItemRef = ref<HTMLDivElement>()

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

    const setClass = computed(() => {
      const { formProps } = context!
      const labelPosition = props.labelPosition || formProps.labelPosition
      const basisClass = 'fect-form-item'
      return getFormItemLayoutClass(formProps.inline, labelPosition, basisClass)
    })

    const setLabelFor = computed(() => props.prop || props.for)

    return () => (
      <div class={`fect-form-item ${setClass.value}`} ref={formItemRef}>
        <FormItemWrapper>
          <label class="fect-form-item__label" for={setLabelFor.value} style={setLabelStyle.value}>
            {props.label}
          </label>
        </FormItemWrapper>
        <div class="fect-form-item__content">{slots.default?.()}</div>
      </div>
    )
  },
})
