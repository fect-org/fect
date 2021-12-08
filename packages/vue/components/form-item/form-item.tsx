import { defineComponent, ref, computed, reactive, toRefs } from 'vue'
import { useProvider, createProvider } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import { getLabelPostion, getLabelWidth, getFormItemLayoutClass, getUnVerfiedClass } from '../form/style'
import { READONLY_FORM_KEY, Trigger } from '../form/type'
import { READONLY_FORM_ITEM_KEY } from './type'
import { props } from './props'
import type { FormProvide } from '../form/type'
import type { CSSProperties } from 'vue'

import './index.less'

const name = createName('FormItem')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const { context } = useProvider<FormProvide>(READONLY_FORM_KEY)

    const { provider } = createProvider(READONLY_FORM_ITEM_KEY)

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

    const formItemProps = reactive({ ...toRefs(props) })

    // const setUnVerfiedClass = computed(() => {
    //   const { formProps } = context!
    //   const display = props.showMessage || formProps.showMessage
    //   return getUnVerfiedClass(display, 'fect-form-item__error')
    // })

    /**
     * user may pass native attrs  for . so  we should intercept the attr
     */
    const setLabelFor = computed(() => props.prop || props.for)

    // ${setRequired.value ? 'is-required' : ''}
    return () => (
      <div class={`fect-form-item ${setClass.value}`} ref={formItemRef}>
        <label class={`fect-form-item__label `} for={setLabelFor.value} style={setLabelStyle.value}>
          {props.label}
        </label>
        <div class="fect-form-item__content">
          {slots.default?.()}
          {/* {false && (
            <div class={`fect-form-item__error ${setUnVerfiedClass.value}`}>
              Please choose the direction you are interested in
            </div>
          )} */}
        </div>
      </div>
    )
  }
})
