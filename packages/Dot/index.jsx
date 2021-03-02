import { computed, toRefs } from 'vue'
import { createNameSpace } from '../utils'
const [createComponent] = createNameSpace('Dot')
import './dot.less'

export default createComponent({
  props: {
  },
  setup(props, { attrs, slots, emit }) {

    return () => (
      <>
        <div></div>
      </>
    )
  },
})
