import { computed, onMounted, ref, toRefs } from 'vue'
import { createNameSpace, theme, validator } from '../utils'

const { normalSizes } = theme

const [createComponent] = createNameSpace('Radio')
import './radio.less'


const queryRadioSize = (radioSize)=>{
  const size = {
    mini:'12px',
    small:'14px',
    medium:'16px',
    large:'18px',
  }
  return size[radioSize]
}


export default createComponent({
  props: {
    checked: Boolean,
    disabled:Boolean,
    value: { type: String, default: '11' },
    size: {
      type: String,
      validator: validator.enums(normalSizes),
      default: 'medium',
    },
  },
  emtis: ['change'],
  setup(props, { attrs, slots, emit }) {
    const { checked, value, size ,disabled } = toRefs(props)
    const isDisabled = ref(disabled.value)
    const selfChecked = ref(!!checked.value)
    
    const handlerChange = (e) => {
      if (isDisabled.value) return
      const radioEvent = {
        target:{
          checked:!selfChecked.value,
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e,
      }
      selfChecked.value = !selfChecked.value;
      emit('change', radioEvent)
    }

    const calcRadioSize = computed(()=>{
      const _size =  queryRadioSize(size.value)
      const style = {}
      style['--radioSize'] = _size
      return style
    })

    return () => (
      <div className={`fay-radio ${attrs?.class ? attrs.class : ''}`} style={calcRadioSize.value}>
        <label className={` ${isDisabled.value && 'disabled'}`}>
          <input
            {...attrs}
            type="radio"
            value={value.value}
            checked={selfChecked.value}
            onChange={handlerChange}
            disabled={isDisabled.value}
          ></input>
          <span className={'fay-radio-name'}>
            <span 
              className={`fay-radio-point ${isDisabled.value && 'disabled'} ${selfChecked.value && 'active'}`}  />
            {slots.default?.()}
          </span>
        
        </label>
      </div>
    )
  },
})
