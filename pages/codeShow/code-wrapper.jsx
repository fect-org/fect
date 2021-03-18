import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
import 'prismjs'
import 'prismjs/components/prism-jsx'
import Prism from 'vue-prism-component'

const READONLY_CODESHOW_KEY = 'codeShowKey'

const CodeWrapper = defineComponent({
  setup() {
    const { ctx } = useProvider(READONLY_CODESHOW_KEY)
    return () => (
      <>
        <Prism language="html">{ctx.code}</Prism>
      </>
    )
  },
})

export default CodeWrapper
