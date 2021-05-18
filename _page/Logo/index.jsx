import { watchEffect, ref } from 'vue'
import { createNameSpace, useProvider } from '../../packages/utils'

import light from '../../src/assets/default.png'
import dark from '../../src/assets/dark.png'
const [createComponent] = createNameSpace('Logo')

const READONLY_LAYOUT_KEY = 'layoutKey'

export default createComponent({
  setup(props, { slots }) {
    const img = ref(light)
    const { ctx } = useProvider(READONLY_LAYOUT_KEY)
    watchEffect(() => {
      const theme = ctx.theme.value

      if (theme === 'dark') {
        img.value = dark
        return
      }
      img.value = light
    })

    return () => (
      <>
        <fe-image src={img.value} height="200px" width="100%" />
      </>
    )
  },
})
