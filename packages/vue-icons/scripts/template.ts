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

export const installerTmepalte = `const install =(app:App)=>{
  components.forEach((c:any) => {
    if (c.install) {
      app.use(c);
    } else if (c.name) {
      app.component(c.name, c);
    }
  });
};\n
export { install };\n
export default { install }\n
`

export const installerImportTempalte = `
import {App} from 'vue';\n`
