import { defineComponent } from 'vue'

import { createName } from '../utils'

const name = createName('FormItem')

export default defineComponent({
  name,
  setup(props, { slots }) {},
})
