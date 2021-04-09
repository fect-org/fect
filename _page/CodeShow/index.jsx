import { createNameSpace, createProvider } from '../../packages/utils'

import CodeComponent from './code.component'
import Title from './code.title'
import CodePreView from './code.preview'
import { toRefs, ref, toRef } from 'vue'

const READONLY_CODESHOW_KEY = 'codeShowKey'

const [createComponent] = createNameSpace('CodeShow')

export default createComponent({
  props: {
    title: String,
    desc: String,
    name: String,
  },
  setup(props, { slots }) {
    const { provider } = createProvider(READONLY_CODESHOW_KEY)
    const code = ref(null)
    const setpreViewCode = (pre) => (code.value = pre)
    const { title, desc, name } = toRefs(props)
    provider({
      title: title.value,
      desc: desc.value,
      name: name.value,
      code,
      setpreViewCode,
    })
    return () => (
      <>
        <Title />
        <div className="f_doc-codeShow_container">
          <CodeComponent v-slots={slots} />
          <CodePreView />

          <style jsx>{`
            .f_doc-codeShow_container {
              width: 100%;
              border-radius: 5px;
              border: 1px solid var(--accents-2);
            }
          `}</style>
        </div>
      </>
    )
  },
})