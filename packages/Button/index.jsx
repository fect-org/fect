import { defineComponent, toRefs } from 'vue'
import validator from '../utils/validator'
import theme from '../utils/theme'
import './button.less'
const { buttonTypes,normalSizes } = theme

const Buttton = defineComponent({
  props:{
    type:{
      type:String,
      validator:validator.enums(buttonTypes),
    },
    size:{
      type:String,
      validator:validator.enums(normalSizes),
    },
    disabled:Boolean,
    shadow:Boolean,
    loading:Boolean,
  },
  emits:['click'],
  setup(props,{ attrs,slots,emit }){
    const { size,type } = toRefs(props)

    const clickHandler = (e)=>emit('click',e)
    return ()=>
      ( <>
        <div 
          className={'fay-btn'}
          onClick={clickHandler}>{slots && slots.default()}</div>
      </>)
  },
})


export default Buttton
