import { createNameSpace } from '../../packages/utils'
import Anchor from '../anchor'

const [createComponent] = createNameSpace('Attributes')
import './attributes.less'

export default createComponent({
  setup(props, { slots }) {
    return () => (
      <>
        <fay-spacer y={5} />
        <h3 className="api-title">
          <Anchor>API's</Anchor> / 接口文档
        </h3>
        <fay-card class="attrs">{slots.default?.()}</fay-card>
        <Spacer y={3} />
      </>
    )
  },
})
