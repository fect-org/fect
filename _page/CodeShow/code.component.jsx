import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
const READONLY_CODESHOW_KEY = 'codeShowKey'
import './code.component.less'
import codeRender from './code.render'

const CodeComponent = defineComponent({
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_CODESHOW_KEY)
    const { name } = ctx

    return () => (
      <div className="f_doc-code-components">
        <codeRender name={name} />
      </div>
    )
  },
})

export default CodeComponent
