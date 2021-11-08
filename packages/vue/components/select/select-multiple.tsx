import { defineComponent } from 'vue'
import Grid from '../grid'
import SelcetClearableIcon from './select-clear-icon'

const SelectMultiple = defineComponent({
  props: {
    clearable: Boolean,
  },
  emits: ['clear'],
  setup(props, { slots, emit }) {
    const clearHandler = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      emit('clear', e)
    }

    return () => (
      <Grid>
        <div class="fect-select__item">
          {slots.default?.()}
          {props.clearable && <SelcetClearableIcon onClick={clearHandler} />}
        </div>
      </Grid>
    )
  },
})

export default SelectMultiple
