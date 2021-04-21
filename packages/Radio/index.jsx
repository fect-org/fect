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
    value: { type: [String,Number] ,required:true },
    size: {
      type: String,
      validator: validator.enums(normalSizes),
      default: 'medium',
    },
  },
  emits: ['change'],
  setup(props, { attrs, slots, emit }) {
    
    const { checked, value, size ,disabled } = toRefs(props)
    const { ctx } = useProvider(READNONLY_RADIO_GROUP_KEY)
    const radioValue = ref(value?.value) //single radio value
    const radioSize = ref(size.value)
    const isDisabled = ref(disabled.value)
    const selfChecked = ref(!!checked.value)

    const changeStatus = ()=>{
      isDisabled.value = ctx.props.disabled
      radioSize.value = ctx.props.size
      /** refactor */
      const parentValue = ctx.props?.initialValue || null
      if (ctx.groupValue.value) selfChecked.value = ctx.groupValue.value === value.value
      if (!ctx.groupValue.value){
        if (parentValue) selfChecked.value = parentValue === value.value
      }
    }

    /**
     * when component init,it will execute once.
     * watchEffect will executed auto when the dependence is changed 
     */
    if (ctx){
      watchEffect(()=>{
        changeStatus()
      })
    } 
    /**
     * without radioGroup 
     */
    if (!ctx){
      watchEffect(()=>{
        selfChecked.value = checked.value ? true : false
      })
    }
   
    const handlerChange = (e) => {
      if (isDisabled.value) return
      selfChecked.value = !selfChecked.value
      const radioEvent = {
        target:{
          checked:selfChecked.value,
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e,
      }
      if (ctx){
        ctx.groupValue.value = value.value
        ctx.updateState && ctx.updateState(radioValue.value)
      }
      if (!ctx){
        emit('change', radioEvent)
      }
    }

    const calcRadioSize = computed(()=>{
      const _size = queryRadioSize(radioSize.value)
      const style = {}
      style['--radioSize'] = _size
      return style
    })

    return () => (
      <div 
        {...attrs}
        className={`fect-radio ${attrs?.class ? attrs.class : ''}`} style={calcRadioSize.value}>
        <label className={` ${isDisabled.value ? 'disabled' : ''}`}>
          <input
            type="radio"
            value={radioValue.value}
            checked={selfChecked.value}
            onChange={handlerChange}
            disabled={isDisabled.value}
          ></input>
          <span className={'fect-radio-name'}>
            <span 
              className={`fect-radio-point ${isDisabled.value ? 'disabled' : ''} ${selfChecked.value ? 'active' : ''}`}  />
            {slots.default?.()}
          </span>
        
        </label>
      </div>
    )
  },
})
