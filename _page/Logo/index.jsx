import { watchEffect, ref } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createNameSpace } from '../../packages/utils'

import light from '../../src/assets/default.png'
import dark from '../../src/assets/dark.png'
const [createComponent] = createNameSpace('Logo')

const READONLY_LAYOUT_KEY = 'layoutKey'

export default createComponent({
  setup(props, { slots }) {
    const img = ref(light)
    const { context } = useProvider(READONLY_LAYOUT_KEY)
    watchEffect(() => {
      const theme = context.theme.value

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
