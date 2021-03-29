import { computed, toRefs } from 'vue'
import { createNameSpace,theme,validator,createProvider } from '../utils'
const [createComponent] = createNameSpace('Row')

const { justifyTypes,alignTypes } = theme

const READONLY_LAYOUT_KEY = 'layoutKey'

import './row.less'

export default createComponent({
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    gutter: {
      type:[String, Number],
      default:0,
    },
    justify:{
      type:String,
      validator:validator.enums(justifyTypes),
      default:'start',
    },
    align:{
      type:String,
      validator:validator.enums(alignTypes),
      default:'top',
    },
  },
  setup(props, { attrs, slots }) {
    const { tag ,gutter,justify,align } = toRefs(props)

    const { provider } = createProvider(READONLY_LAYOUT_KEY)

    provider({ gutter })

    const calcClass = computed(()=>{
      let _class = ''
      if (justify.value !== 'start'){
        _class += ` fect-justify-${justify.value}`
      }
      if (align.value !== 'top'){
        _class += ` fect-align-${align.value}`
      }
      return _class.trim()
    })

    const calcGutter = computed(()=>{
      const style = {}
      if (gutter.value){
        style.marginLeft = `-${gutter.value / 2}px`
        style.marginRight = style.marginLeft
      } 
      return style
    })

    return () => (
      <>
        <tag.value {...attrs} 
          style={calcGutter.value}
          className={`fect-row ${calcClass.value} ${attrs?.class ? attrs.class : ''}`}>
          {slots.default?.()}
        </tag.value>
      </>
    )
  },
})
