import { computed, PropType, defineComponent } from 'vue'
import { createName, isArray } from '../utils'
import type { NormalSizes, NormalTypes, LoadingTypes } from '../utils'
import LoadingCircle from './loading-circle'
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
      const { color, loadType } = props
      if (!color) return

      const getCurrentColor = () => {
        const isArr = isArray(color)
        if (loadType === 'circle' && isArr) return 'initial'
        return isArr ? `linear-gradient(${color.join()})` : color
      }
      const safeColor = getCurrentColor()
      if (loadType !== 'circle')
        return {
          background: safeColor
        }
      return {
        color: safeColor
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
      if (loadType === 'circle') return null
      const loader = { wave, default: normal, cube }
      return loader[loadType] || loader.default
    })
    // LoadingCircle
    return () => (
      <div class="fect-loading">
        <span class="loading">
          {getLoadNum.value ? (
            [...Array(getLoadNum.value)].map((_, i) => (
              <i class={`loading__${props.loadType} ${setClass.value}`} style={setColor.value} key={i} />
            ))
          ) : (
            <LoadingCircle class={setClass.value} style={setColor.value} />
          )}
        </span>
      </div>
    )
  }
})
