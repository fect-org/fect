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
