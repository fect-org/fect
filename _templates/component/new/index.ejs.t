---
to: packages/<%= name %>/index.tsx
---

import { computed } from 'vue'
import { createNameSpace } from '../utils'
import './index.less'

const [createComponent] = createNameSpace('<%= name %>')

export default createComponent({
  props: {
  },
  setup(props, { attrs, slots, emit }) {

    return () => (
       <div></div>
    )
  },
})
