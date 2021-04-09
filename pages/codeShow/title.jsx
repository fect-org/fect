import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
import Anchor from '../anchor'
const READONLY_CODESHOW_KEY = 'codeShowKey'

const Title = defineComponent({
  setup() {
    const { ctx } = useProvider(READONLY_CODESHOW_KEY)
    const { title, desc } = ctx // display title  desc

    return () => (
      <>
        <h3 style={{ marginBottom: desc ? '0' : '30px;' }}>
          <Anchor>{title}</Anchor>
          {desc && <p>{desc}</p>}
        </h3>
        {/* <style jsx>{`
          h3 {
            line-height: 1;
            font-size: 20px;
            margin-top: 75px;
            text-transform: capitalize;
            position: relative;
          }
          h3 > p {
            margin: 13pt 0;
            font-size: 0.75em;
            font-weight: 400;
          }
          h3 > :code,
          h3 > :pre {
            text-transform: none;
          }
        `}</style> */}
      </>
    )
  },
})

export default Title
