<template>
  <div>
     <fe-tooltip
     :visible="visible"
      content="缓存是达到高性能的重要组成部分"
      
    >
     tooltip
    </fe-tooltip>
  </div>
</template>

<script>
import { ref ,watchEffect } from 'vue'
export default {
  name: 'ex-tooltip-default',
  setup(){
    const visible = ref(false)
    watchEffect(()=>{
      console.log(visible.value)
    })
    return { visible }
  },
}
</script>
