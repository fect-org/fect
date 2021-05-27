import { defineComponent } from 'vue'

const SelectMultiple = defineComponent({
  setup(props, { slots }) {
    return () => <div class="fect-select__item">{slots.default?.()}</div>
  },
})

export default SelectMultiple
