import { onMounted } from 'vue'
import { createNameSpace } from '../../packages/utils'
import './attributes.common.less'
const [createComponent] = createNameSpace('Attributes')
export default createComponent({
  setup(props, { slots }) {
    onMounted(() => {
      const codes = document.querySelectorAll('inlinecode')
      codes.forEach((code) => {
        const content = code.textContent
        const codeEl = document.createElement('code')
        codeEl.innerHTML = content
        code.parentNode.replaceChild(codeEl, code)
      })
    })
    return () => (
      <>
        <fe-spacer y={2} />
        <div class="f_doc-api_attrs">{slots.default?.()}</div>
        <fe-spacer y={1} />
      </>
    )
  },
})
