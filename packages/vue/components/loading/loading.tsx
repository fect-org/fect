import { computed, PropType, defineComponent } from 'vue'
import { createName } from '../utils'
import { NormalSizes, NormalTypes, LoadingTypes } from '../utils'
import './index.less'

const name = createName('Loading')

export default defineComponent({
  name,
  props: {
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium'
    },
    type: {
      type: String as PropType<NormalTypes>,
      default: 'default'
    },
    loadType: {
      type: String as PropType<LoadingTypes>,
      default: 'default'
    },
    color: {
      type: [String, Array],
      default: ''
    }
  },
  setup(props) {
    const setColor = computed(() => {
      const { color } = props
      if (!color) return
      const safeColor = Array.isArray(color) ? `linear-gradient(${color.join()})` : color
      return {
        background: safeColor
      }
    })

    /**
     * follow variable is loading type should fill element count.
     */
    const wave = 5
    const cube = 4
    const normal = 3

    const setClass = computed(() => {
      const { size, type } = props
      const names = []
      names.push(type)
      names.push(size)
      return names.join(' ')
    })

    const getLoadNum = computed(() => {
      const { loadType } = props
      const loader = { wave, default: normal, cube }
      return loader[loadType] || loader.default
    })

    return () => (
      <div class="fect-loading">
        <span class="loading">
          {[...Array(getLoadNum.value)].map((_, i) => (
            <i class={`loading__${props.loadType} ${setClass.value}`} style={setColor.value} key={i} />
          ))}
        </span>
      </div>
    )
  }
})
