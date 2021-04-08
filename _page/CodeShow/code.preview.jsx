import { defineComponent, ref } from 'vue'
import CodeWrapper from './code.wrapper'
import './code.preview.less'

const CodePreView = defineComponent({
  setup() {
    const visible = ref(false)
    const codeIcon = ref('chevronRight')
    const handlerClick = (e) => {
      e.stopPropagation()
      e.preventDefault()
      visible.value = !visible.value
    }
    const handlerCopyClick = (e) => {
      e.stopPropagation()
      e.preventDefault()
      console.log(e)
    }

    return () => (
      <>
        <div className="f_code-preview">
          <details open={visible.value}>
            <summary onClick={handlerClick}>
              <fect-row
                justify="space-between"
                style={{ height: '100%', width: '100%' }}
              >
                <fect-col className="f_doc-action">
                  <span
                    className="f_doc-arrow"
                    style={{
                      transform: `rotate(${visible.value ? 90 : 0}deg)`,
                    }}
                  >
                    <fect-icon icon={codeIcon} />
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
                </fect-col>
              </fect-row>
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
