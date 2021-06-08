import { defineComponent, ref, onMounted } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
const READONLY_CODESHOW_KEY = 'codeShowKey'
import './code.component.less'
import codeRender from './code.render'

const CodeComponent = defineComponent({
  setup(props) {
    const { context } = useProvider(READONLY_CODESHOW_KEY)
    const { name } = context
    const renderRef = ref(null)
    onMounted(() => {
      const codes = renderRef.value._.subTree.type._meta().default
      context.setpreViewCode(codes)
    })

    return () => (
      <div className="f_doc-code-components">
        <codeRender name={name} ref={renderRef} />
      </div>
    )
  },
})

export default CodeComponent
