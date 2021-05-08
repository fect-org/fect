import { computed, toRefs } from 'vue'
import { createNameSpace } from '../utils'
const [createComponent] = createNameSpace('Image')
import './image.less'

export default createComponent({
  props: {
    src: {
      type: String,
      default: '',
    },
    skeleton: Boolean,
    maxDelay: {
      type: [String, Number],
      default: 3000,
    },
    width: {
      type: [Number, String],
      default: 'auto',
    },
    height: {
      type: [Number, String],
      default: 'auto',
    },
  },
  setup(props, { attrs, slots, emit }) {
    return () => (
      <div class="fect-image">
        <img
          src={props.src}
          width={props.width}
          height={props.height}
          {...attrs}
        />
      </div>
    )
  },
})
