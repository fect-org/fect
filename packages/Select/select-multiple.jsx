import { defineComponent } from 'vue'
import SelcetClearableIcon from './select-icon-clear'

const SelectMultiple = defineComponent({
  props: {
    clearable: Boolean,
  },
  emits: ['clear'],
  setup(props, { slots, emit }) {
    const clearHandler = (e) => {
      e.stopPropagation()
      e.preventDefault()
      emit('clear', e)
    }

    return () => (
      <div class="fect-select__item">
        {slots.default?.()}
        {props.clearable && <SelcetClearableIcon onClick={clearHandler} />}
      </div>
    )
  },
})

export default SelectMultiple
