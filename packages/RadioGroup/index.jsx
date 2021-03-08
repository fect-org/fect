import { computed, toRefs ,ref } from 'vue'
import { createNameSpace, theme, validator,createProvider } from '../utils'

const { normalSizes } = theme

const [createComponent] = createNameSpace('RadioGroup')

const READNONLY_RADIO_GROUP_KEY = 'radioGroupKey'

import './radioGroup.less'

const queryRadioSize = (radioSize) => {
  const size = {
    mini: '12px',
    small: '14px',
    medium: '16px',
    large: '18px',
  }
  return size[radioSize]
}

export default createComponent({
  props: {
    value: [String, Number],
    initialValue: [String, Number],
    useRow: Boolean,
    disabled: Boolean,
    size: {
      type: String,
      validator: validator.enums(normalSizes),
      default: 'medium',
    },
  },
  emits: ['change'],
  setup(props, { attrs, slots,emit }) {
    const { value, initialValue, useRow, disabled, size } = toRefs(props)
    const sefvalueGroup = ref(initialValue?.value)
    const updateState = (nextVal)=>{
      sefvalueGroup.value = nextVal
      emit(nextVal)
    }
    const { children,provider } = createProvider(READNONLY_RADIO_GROUP_KEY)
    provider({ updateState,disabledAll:disabled,val:sefvalueGroup,inGroup:true })
    return () => (
      <>
        <div 
          {...attrs} 
          className={`fay-radio-group 
            ${useRow.value && 'useRow'}
            ${attrs?.class ? attrs.class : ''}`}>
          {slots.default?.()}
        </div>
        
      </>
    )
  },
})
