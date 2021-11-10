import { defineComponent } from 'vue'
import { createName } from '../utils'

const name = createName('Form')

export default defineComponent({
  name,
  setup(props, { slots, emit }) {},
})
