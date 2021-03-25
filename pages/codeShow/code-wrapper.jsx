import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
import 'prismjs/themes/prism.css'
import Prism from 'vue-prism-component'

const READONLY_CODESHOW_KEY = 'codeShowKey'

const CodeWrapper = defineComponent({
  setup() {
    const { ctx } = useProvider(READONLY_CODESHOW_KEY)
    return () => (
      <>
        <Prism language="html">{ctx.code}</Prism>
        <style jsx>{`
          code[class*='language-'],
          pre[class*='language-'] {
            text-shadow: none;
            font-family: var(--font-sans);
          }
          pre[class*='language-']::selection,
          pre[class*='language-'] ::selection,
          code[class*='language-']::selection,
          code[class*='language-'] ::selection {
            background-color: var(--primary-selection);
          }
        `}</style>
      </>
    )
  },
})

export default CodeWrapper
