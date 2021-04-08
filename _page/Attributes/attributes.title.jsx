import { createNameSpace } from '../../packages/utils'
import Anchor from '../Anchor'
const [createComponent] = createNameSpace('AttributesTitle')
import './attributes.title.less'
export default createComponent({
  props: {
    title: String,
  },
  setup(props) {
    return () => (
      <>
        <h4>
          <span className={'f_doc-attr_title'}>
            <Anchor>{props?.title && props.title}</Anchor>
          </span>
        </h4>
      </>
    )
  },
})
