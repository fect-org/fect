import { computed, toRefs } from 'vue'
import { createNameSpace, validator, theme } from '../utils'
import './pagination.less'

const [createComponent] = createNameSpace('Pagination')
const { normalSizes } = theme

const READONLY_PAGINATION_KEY = 'paginationKey'

const queryPaginationSize = (size) => {
  const sizes = {
    mini: { font: '12px', width: '20px' },
    small: { font: '12px', width: '26.5px' },
    medium: { font: '14px', width: '32px' },
    large: { font: '16px', width: '38.5px' },
  }
  return sizes[size]
}

export default createComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    count: {
      type: [String, Number],
      default: 1,
    },
    size: {
      type: String,
      default: 'medium',
      validator: validator.enums(normalSizes),
    },
    prevText: { type: String, default: 'Prev' },
    nextText: { type: String, default: 'Next' },
    simple: Boolean,
  },
  setup(props, { attrs, slots, emit }) {
    return () => <nav class="fect-pagination"></nav>
  },
})
