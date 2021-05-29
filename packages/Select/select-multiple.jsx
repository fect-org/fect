import { defineComponent } from 'vue'

const SelectMultiple = defineComponent({
  emits: ['clear'],
  setup(props, { slots }) {
    return () => <div class="fect-select__item">{slots.default?.()}</div>
  },
})

export default SelectMultiple
