import { createNameSpace } from '../utils'

import './index.less'

const [createComponent] = createNameSpace('Spinner')

export default createComponent({
  setup(props, { slots }) {
    const renderDot = () =>
      new Array(12).fill(0).map((_, idx) => <span key={`spinner-${idx}`} />)

    return () => (
      <div class="fect-spinner">
        <div class="fect-spinner__container">{renderDot()}</div>
      </div>
    )
  },
})
