import { defineComponent, onMounted, ref } from 'vue'
import { useProvider } from '../../packages/utils'
import Prism from 'vue-prism-component'

const READONLY_CODESHOW_KEY = 'codeShowKey'

const CodeWrapper = defineComponent({
  setup() {
    const { ctx } = useProvider(READONLY_CODESHOW_KEY)
    const preViewCode = ref(null)
    onMounted(() => {
      preViewCode.value = ctx.code.value
    })
    return () => (
      <>
        {/* code={ctx.code.value} */}
        {preViewCode.value && (
          <Prism language="html">{preViewCode.value}</Prism>
        )}
      </>
    )
  },
})

export default CodeWrapper
