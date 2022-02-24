import { defineComponent } from 'vue'
import Grid from '../grid'
import { createBem } from '../utils'
import SelcetClearableIcon from './select-clear-icon'

const bem = createBem('fect-select')

export default defineComponent({
  props: {
    clearable: Boolean
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
        <div class={bem('item')}>
          {slots.default?.()}
          {props.clearable && <SelcetClearableIcon onClick={clearHandler} />}
        </div>
      </Grid>
    )
  }
})
