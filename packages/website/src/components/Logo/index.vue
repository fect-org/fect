<template>
  <fe-image height="200px" width="100%" :src="img" />
</template>

<script lang="ts">
const light = 'https://user-images.githubusercontent.com/52351095/124437307-84134900-dda9-11eb-8a2e-78f7fd94d2d9.png'
const dark = 'https://user-images.githubusercontent.com/52351095/124437265-7a89e100-dda9-11eb-910b-58275f1bcc09.png'

import { defineComponent, ref, watchEffect } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'

export default defineComponent({
  name: 'feLogo',
  setup() {
    const img = ref<string>(light)
    // watchEffect(() => {
    //   const theme = context!.theme.value
    //   if (theme === 'dark') {
    //     img.value = dark
    //     return
    //   }
    //   img.value = light
    // })
    return { img }
  },
})
</script>
