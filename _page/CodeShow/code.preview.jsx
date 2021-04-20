import { defineComponent, ref, getCurrentInstance } from 'vue'
import CodeWrapper from './code.wrapper'
// import { useClipboard } from '../utils/clipboard'
import { useProvider, useClipboard } from '../../packages/utils'
import './code.preview.less'
const READONLY_CODESHOW_KEY = 'codeShowKey'

const CodePreView = defineComponent({
  setup() {
    const visible = ref(false)
    const codeIcon = ref('chevronRight')
    const { ctx } = useProvider(READONLY_CODESHOW_KEY)
    const { proxy } = getCurrentInstance()
    const { copyText } = useClipboard()
    const handlerClick = (e) => {
      e.stopPropagation()
      e.preventDefault()
      visible.value = !visible.value
    }
    const handlerCopyClick = (e) => {
      e.stopPropagation()
      e.preventDefault()
      copyText(ctx.code.value)
      proxy.$toast.success({ text: '复制成功~' })
    }

    return () => (
      <>
        <div className="f_code-preview">
          <details open={visible.value}>
            <summary onClick={handlerClick}>
              <fe-row
                justify="space-between"
                style={{ height: '100%', width: '100%' }}
              >
                <fe-col className="f_doc-action">
                  <span
                    className="f_doc-arrow"
                    style={{
                      transform: `rotate(${visible.value ? 90 : 0}deg)`,
                    }}
                  >
                    <fect-icon icon={codeIcon.value} />
                  </span>
                  <span>浏览代码</span>
                  {visible.value && (
                    <fect-icon
                      onClick={handlerCopyClick}
                      class={`f_icons_transform ${
                        visible.value ? 'active' : ''
                      }`}
                      icon="copy"
                      size="18"
                      style={{ marginLeft: 'auto', marginRight: '20px' }}
                    />
                  )}
                </fe-col>
              </fe-row>
            </summary>
            <div className="f_doc-area">
              <CodeWrapper></CodeWrapper>
            </div>
          </details>
        </div>
      </>
    )
  },
})

export default CodePreView
