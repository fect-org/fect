import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
import Prism from 'vue-prism-component'

const READONLY_CODESHOW_KEY = 'codeShowKey'

const CodeWrapper = defineComponent({
  setup() {
    const { ctx } = useProvider(READONLY_CODESHOW_KEY)
    return () => (
      <>
        {/* <Prism language="html">{ctx.code}</Prism> */}
        <style jsx></style>
      </>
    )
  },
})

export default CodeWrapper
