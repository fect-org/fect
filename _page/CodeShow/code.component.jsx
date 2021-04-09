import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
const READONLY_CODESHOW_KEY = 'codeShowKey'
import './code.component.less'

const CodeComponent = defineComponent({
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_CODESHOW_KEY)
    const { code } = ctx
    console.log(code)

    const tempRender = (code) => code

    return () => (
      <div className="f_doc-code-components" v-html={tempRender(code)}>
        {/* {slots.default?.()} */}
      </div>
    )
  },
})

export default CodeComponent
