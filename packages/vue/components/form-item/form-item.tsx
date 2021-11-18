import { defineComponent, ref, computed, CSSProperties } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import FormItemWrapper from './form-item-wrapper'
import { props } from './props'
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
      const { pattern, labelState } = context!
      console.log(labelState.value)
      const style: CSSProperties = {}
      // const labelWidth =
      // if(labelState.value.)
      // const {} = context?.pattern

      return style
    })

    return () => (
      <div class="fect-form__item" ref={formItemRef}>
        <FormItemWrapper>
          <label for={props.prop} style={setLabelStyle.value}>
            {props.label}
          </label>
        </FormItemWrapper>
        {slots.default?.()}
      </div>
    )
  },
})
