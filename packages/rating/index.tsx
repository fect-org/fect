import { computed } from 'vue'
import { createNameSpace } from '../utils'

const [createComponent] = createNameSpace('Rating')

export default createComponent({
  props: {},
  setup() {
    return () => <div>111</div>
  },
})
