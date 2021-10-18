import { defineComponent } from 'vue'
import { createName } from '../utils'

import './index.less'

const name = createName('Spinner')

export default defineComponent({
  name,
  props: {},
  setup(props, { slots }) {
    const renderDot = () => new Array(12).fill(0).map((_, idx) => <span key={`spinner-${idx}`} />)

    return () => (
      <div class="fect-spinner">
        <div class="fect-spinner__container">{renderDot()}</div>
      </div>
    )
  },
})
