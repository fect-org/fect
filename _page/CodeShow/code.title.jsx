import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
import Anchor from '../Anchor'

import './code.title.less'
const READONLY_CODESHOW_KEY = 'codeShowKey'

const Title = defineComponent({
  setup() {
    const { ctx } = useProvider(READONLY_CODESHOW_KEY)
    const { title, desc } = ctx // display title  desc

    return () => (
      <>
        <h3 class={`f_doc-codeShow_anTitle ${desc ? 'f_doc-t_desc' : ''}`}>
          <Anchor>{title}</Anchor>
          {desc && <p>{desc}</p>}
        </h3>
      </>
    )
  },
})

export default Title
