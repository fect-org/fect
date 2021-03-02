---
to: packages/<%= name %>/index.jsx
---

import { computed, toRefs } from 'vue'
import { createNameSpace } from '../utils'
const [createComponent] = createNameSpace('<%= name %>')
import './<%= h.changeCase.lcFirst(name) %>.less'

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
