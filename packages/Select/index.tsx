import { computed, toRefs, PropType } from 'vue'
import { createNameSpace } from '../utils'
import { NormalSizes } from '../utils/theme/propTypes'
import './select.less'

const [createComponent] = createNameSpace('Select')

export default createComponent({
  props: {
    modelValue: {
      type: [Array, String],
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    multiple: Boolean,
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
    width: {
      type: String,
      default: 'initial',
    },
    clearable: Boolean,
    disabled: Boolean,
  },
  emits: ['change'],
  setup(props, { attrs, slots, emit }) {
    return () => <div class="fect-select">
      
    </div>
  },
})
