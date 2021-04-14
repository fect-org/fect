import { defineComponent, ref, onMounted } from 'vue'
import { useProvider } from '../../packages/utils'
const READONLY_CODESHOW_KEY = 'codeShowKey'
import './code.component.less'
import codeRender from './code.render'

const CodeComponent = defineComponent({
  setup(props) {
    const { ctx } = useProvider(READONLY_CODESHOW_KEY)
    const { name } = ctx
    const renderRef = ref(null)
    onMounted(() => {
      const codes = renderRef.value._.subTree.type._meta().default
      ctx.setpreViewCode(codes)
    })

    return () => (
      <div className="f_doc-code-components">
        <codeRender name={name} ref={renderRef} />
      </div>
    )
  },
})

export default CodeComponent
