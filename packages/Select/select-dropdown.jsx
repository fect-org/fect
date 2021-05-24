import { defineComponent } from 'vue'

import { useRect } from '../utils'

const SelectDropDown = defineComponent({
  setup(props, { slots }) {
    return () => <div class="fect-select__dropdown">{slots.default?.()}</div>
  },
})

export default SelectDropDown
