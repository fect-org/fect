import { computed, toRefs ,ref  } from 'vue'
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
    const {  useRow } = toRefs(props)
    const groupValue = ref(null)
    const updateState = (nextVal)=> emit('change',nextVal)
    
    const { provider } = createProvider(READNONLY_RADIO_GROUP_KEY)
    provider({ props , updateState ,groupValue })
    return () => (
      <>
        <div 
          {...attrs} 
          className={`fect-radio-group 
            ${useRow.value ? 'useRow' : ''}
            ${attrs?.class ? attrs.class : ''}`}>
          {slots.default?.()}
        </div>
        
      </>
    )
  },
})
