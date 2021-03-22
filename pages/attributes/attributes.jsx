import { onMounted, watchEffect } from '@vue/runtime-core'
import { createNameSpace } from '../../packages/utils'

const [createComponent] = createNameSpace('Attributes')
import Anchor from '../anchor'
import './attributes.less'

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
        <Fect-spacer y={5} />
        <h3 className="api-title">
          <Anchor>API's</Anchor> / 接口文档
        </h3>
        <fect-card class="attrs">{slots.default?.()}</fect-card>
        <Spacer y={3} />
      </>
    )
  },
})
