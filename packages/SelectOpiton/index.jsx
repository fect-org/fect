import { computed, ref, toRefs } from 'vue'
import { createNameSpace, useProvider, theme } from '../utils'
import './selectOption.less'

const [createComponent] = createNameSpace('option')

const READONLY_SELECT_KEY = 'selectKey'

export default createComponent({
  props: {},
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_SELECT_KEY)

    return () => <div class="fect-option">{slots.default?.()}</div>
  },
})
