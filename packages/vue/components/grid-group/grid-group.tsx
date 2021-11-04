import { defineComponent, computed } from 'vue'

import { createName } from '../utils'
import { props } from './props'

import './index.less'

const name = createName('GridGroup')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
      
    const setGroupClass = computed(() => {})

    const setGroupStyle = computed(() => {})
    return () => <div class="fect-grid__group">{slots.default?.()}</div>
  },
})
