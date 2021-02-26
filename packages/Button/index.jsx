import { defineComponent, toRefs } from 'vue'

import validator from '../utils/validator'

import theme from '../utils/theme'

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
    return ()=>
      ( <>
        <div>1</div>
      </>)
  },
})


export default Buttton
