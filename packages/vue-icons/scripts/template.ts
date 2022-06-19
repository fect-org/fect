export const singleDefine = (name: string, el: string) => `
import { defineComponent , computed } from 'vue'
export default defineComponent({
  name: '${name}',
  props:{
    color:{
      type:String,
      default:'currentColor'
    },
    size:{
      type:[String,Number],
      default:24
    }
  },
  setup(props){
    const setColor = computed(()=>props.color);
    const setSize = computed(()=>props.size);
    
    return ()=>${el}
  }
})
`

export const exportsTemplate = (name: string, path: string) => `

import _${name} from './${path}';\n

export const ${name} = _${name};\n

export default ${name}

`
