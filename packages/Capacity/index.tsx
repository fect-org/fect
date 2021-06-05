import { computed } from 'vue'
import { createNameSpace } from '../utils'
import './capacity.less'

const [createComponent] = createNameSpace('Capacity')

export default createComponent({
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    limit: {
      type: [Number, String],
      default: 0,
    },
    color: String,
  },
  setup(props) {
    const setColor = computed(() => {
      if (props?.color) {
        return props.color
      }
      const val = props.value
      if (val < 33) return 'var(--hightlight-cyan)'
      if (val < 66) return 'var(--warning-light)'
      return 'var(--error-dark)'
    })
    return () => (
      <div title={`${props.value}%`} class="fect-capacity">
        <span
          style={{ backgroundColor: setColor.value, width: `${props.value}%` }}
        ></span>
      </div>
    )
  },
})
