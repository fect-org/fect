import { PropType, ref } from 'vue'
import { createNameSpace } from '../utils'
import { NormalSizes, NormalTypes } from '../utils/theme/propTypes'
import './index.less'

const [createComponent] = createNameSpace('Loading')

export default createComponent({
  props: {
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
    type: {
      type: String as PropType<NormalTypes>,
      default: 'default',
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const safeColor = ref<boolean>(!!props.color)

    return () => (
      <div class="fect-loading-container">
        <span class={'loading'}>
          {new Array(3).fill(0).map((item, i) => (
            <i
              class={`${props.size} ${props.type}`}
              style={{ backgroundColor: `${safeColor.value && props.color}` }}
              key={item + i}
            ></i>
          ))}
        </span>
      </div>
    )
  },
})
