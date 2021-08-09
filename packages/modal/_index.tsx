import { computed } from 'vue'
import { createNameSpace, useState } from '../utils'

import './_index.less'

const [createComponent] = createNameSpace('Modal')

export default createComponent({
  props: {
    visible: Boolean,
    title: {
      tupe: String,
      default: '',
    },
    width: {
      type: String,
      default: '400px',
    },
    cancel: {
      type: String,
      default: 'cancel',
    },
    done: {
      type: String,
      default: 'done',
    },
    // loading: Boolean,
  },
  setup() {
    return () => (
      <div class="fect-modal__root">
        <div class="fect-modal__backdrop">
          <div class="fect-modal__backdrop responsive"></div>
        </div>
      </div>
    )
  },
})
