import { computed, toRefs ,ref } from 'vue'
import { createNameSpace, theme, validator,createProvider } from '../utils'

const { normalSizes } = theme

const [createComponent] = createNameSpace('RadioGroup')

const READNONLY_RADIO_GROUP_KEY = 'radioGroupKey'

import './radioGroup.less'

export default createComponent({
  props: {
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
    const { initialValue, useRow, disabled, size } = toRefs(props)
    const selfvalueGroup = ref(initialValue?.value)
    const groupSize = ref(size.value)
    const disabledAll = ref(disabled.value)
    const updateState = (nextVal)=>{
      sefvalueGroup.value = nextVal
      emit(nextVal)
    }
    const { provider } = createProvider(READNONLY_RADIO_GROUP_KEY)
    provider({ updateState,disabledAll,groupVal:selfvalueGroup,inGroup:true ,groupSize })
    return () => (
      <>
        <div 
          {...attrs} 
          className={`fay-radio-group 
            ${useRow.value ? 'useRow' : ''}
            ${attrs?.class ? attrs.class : ''}`}>
          {slots.default?.()}
        </div>
        
      </>
    )
  },
})
