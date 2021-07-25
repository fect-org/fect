import { computed } from 'vue'
import { createNameSpace } from '../utils'
import { props } from './props'
import './index.less'

const [createComponent] = createNameSpace('Grid')

type ItemLayoutValue = {
  grow: number
  width: string
  basis: string
  display: string
}

const getItemLayout = (val: number | boolean) => {}

export default createComponent({
  props,
  setup(props, { attrs, slots, emit }) {
    const setClass = computed(() => {
      return '3'
    })

    return () => <div class="fect-grid">{slots.default?.()}</div>
  },
})
