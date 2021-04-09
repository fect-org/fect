import { defineComponent, onMounted, ref } from 'vue'
import { useProvider } from '../../packages/utils'
import Prism from 'vue-prism-component'
const READONLY_CODESHOW_KEY = 'codeShowKey'

import './code.css'

const CodeWrapper = defineComponent({
  setup() {
    const { ctx } = useProvider(READONLY_CODESHOW_KEY)
    const preViewCode = ref(null)
    onMounted(() => {
      preViewCode.value = ctx.code.value
    })
    return () => (
      <>
        {/* {preViewCode.value} */}
        {preViewCode.value && (
          <Prism language="html">{preViewCode.value}</Prism>
        )}
      </>
    )
  },
})

export default CodeWrapper
