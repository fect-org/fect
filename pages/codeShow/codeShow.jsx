import { createNameSpace, createProvider } from '../../packages/utils'

import CodeComponent from './code-component'
import Title from './title'
import CodePreView from './code-preview'

const READONLY_CODESHOW_KEY = 'codeShowKey'

const [createComponent] = createNameSpace('CodeShow')

export default createComponent({
  props: {
    title: String,
    desc: String,
    code: String,
  },
  setup(props, { slots }) {
    const { provider } = createProvider(READONLY_CODESHOW_KEY)
    provider(props)
    return () => (
      <>
        <Title />
        <div className="codeShow-container">
          <CodeComponent v-slots={slots} />
          <CodePreView />
     
          <style jsx>{`
            .codeShow-container {
              width: 100%;
              border-radius: 5px;
              border: 1px solid var(--accents-7);
            }
          `}</style>
        </div>
      </>
    )
  },
})
