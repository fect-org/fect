import { defineComponent, ref } from 'vue'
import CodeWrapper from './code-wrapper'

const CodePreView = defineComponent({
  setup() {
    const visible = ref(false)

    const handlerClick = (e) => {
      // console.log('hahas')
      e.stopPropagation()
      e.preventDefault()
      visible.value = !visible.value
      console.log(visible.value)
    }

    return () => (
      <>
        <div className="code-preview">
          <details open={visible.value}>
            <summary onClick={handlerClick}>
              <fect-row
                justify="space-between"
                style={{ height: '100%', width: '100%' }}
              >
                <fect-col className="action">
                  <span className="arrow">&gt;</span>
                  <span>浏览代码</span>
                </fect-col>
              </fect-row>
            </summary>
            <div className="area">
              <CodeWrapper></CodeWrapper>
            </div>
          </details>
        </div>
        <style jsx>{`
          .code-preview {
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          details {
            background: var(--accents-1);
            transition: all 0.2s ease;
            overflow: hidden;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          summary {
            height: 35px;
            border-top: 1px solid var(--accents-2);
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--accents-5);
            list-style: none;
            user-select: none;
            outline: none;
          }
          summary::-webkit-details-marker {
            display: none;
          }
          summary .action {
            width: auto;
            display: flex;
            align-items: center;
            font-size: 13px;
          }

          summary svg {
            cursor: pointer;
          }

          .arrow {
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            width: 1rem;
            height: 1rem;
            margin-right: 0.5rem;
          }

          .area {
            background: var(--accents-1);
            position: relative;
            box-sizing: border-box;
            white-space: pre;
            font-size: 1em;
            overflow: hidden;
          }

          .area pre {
            margin: 0;
            background: var(--primary-background);
            border: none;
            overflow-x: auto;
          }
          .area pre span {
            text-transform: none;
          }
          .area pre code {
            text-transform: none;
          }
        `}</style>
      </>
    )
  },
})

export default CodePreView
