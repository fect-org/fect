import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
const READONLY_CODESHOW_KEY = 'codeShowKey'
const CodeComponent = defineComponent({
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_CODESHOW_KEY)
    const { code } = ctx
    return () => (
      <div className="code-components">
        {/* {slots.default?.()} */}

        <style jsx>{`
          .code-components {
            width: 100%;
            padding: 16pt;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            justify-content: space-between;
          }
          .code-components > div {
            width: 100%;
          }
        `}</style>
      </div>
    )
  },
})

export default CodeComponent
