---
to: packages/<%= name %>/index.jsx
---

import { computed, toRefs } from 'vue'
import { createNameSpace } from '../utils'
import './<%= h.changeCase.lcFirst(name) %>.less'

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
