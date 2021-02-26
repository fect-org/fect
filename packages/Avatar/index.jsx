import { defineComponent, toRefs } from 'vue'

const Avatar = defineComponent({
  setup(props,{ attrs,slots,emit }){
    return ()=>
      ( <>
        <div></div>
      </>)
  },
})

export default Avatar

