<template>
  <div>
    <fe-popover>
      <span>或许不想知道你的花园长得咋样</span>
      <template #widget>
        <fe-button auto size="mini">Button</fe-button>
      </template>
    </fe-popover>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
export default {
  name: 'ex-tooltip-default',
  setup() {
    const visible = ref(false)
    watchEffect(() => {
      console.log(visible.value)
    })
    return { visible }
  },
}
</script>
