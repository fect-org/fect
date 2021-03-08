import { computed, onMounted, ref, toRefs, watch, watchEffect } from 'vue'
import { createNameSpace, theme, validator,useProvider } from '../utils'

const { normalSizes } = theme

const [createComponent] = createNameSpace('Radio')

const READNONLY_RADIO_GROUP_KEY = 'radioGroupKey'

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
    value: { type: String ,required:true },
    size: {
      type: String,
      validator: validator.enums(normalSizes),
      default: 'medium',
    },
  },
  emtis: ['change'],
  setup(props, { attrs, slots, emit }) {
    
    const { checked, value, size ,disabled } = toRefs(props)
    const { ctx } = useProvider(READNONLY_RADIO_GROUP_KEY)
    const radioValue = ref(value.value)
    const radioSize = ref(size.value)
    const isDisabled = ref(disabled.value)
    const selfChecked = ref(!!checked.value)


    const changeStatus = ()=>{
      isDisabled.value = ctx.props.disabled
      radioSize.value = ctx.props.size
      radioValue.value = ctx.props?.initialValue || null
      selfChecked.value = (radioValue.value === value.value)
    }

    if (ctx){
      watchEffect(()=>{
        changeStatus()
      })
    }
   
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
      if (ctx){
        console.log(value.value)
        ctx.updateState && ctx.updateState(radioValue.value)
      }
      emit('change', radioEvent)
    }

    const calcRadioSize = computed(()=>{
      const _size = queryRadioSize(radioSize.value)
      const style = {}
      style['--radioSize'] = _size
      return style
    })

    return () => (
      <div className={`fay-radio ${attrs?.class ? attrs.class : ''}`} style={calcRadioSize.value}>
        <label className={` ${isDisabled.value ? 'disabled' : ''}`}>
          <input
            {...attrs}
            type="radio"
            value={radioValue.value}
            checked={selfChecked.value}
            onChange={handlerChange}
            disabled={isDisabled.value}
          ></input>
          <span className={'fay-radio-name'}>
            <span 
              className={`fay-radio-point ${isDisabled.value ? 'disabled' : ''} ${selfChecked.value ? 'active' : ''}`}  />
            {slots.default?.()}
          </span>
        
        </label>
      </div>
    )
  },
})
