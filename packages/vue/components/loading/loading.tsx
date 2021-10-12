import { computed, PropType, defineComponent, CSSProperties } from 'vue'
import { createName } from '../utils'
import { NormalSizes, NormalTypes, LoadingTypes } from '../utils'
import './index.less'

const name = createName('Loading')

export default defineComponent({
  name,
  props: {
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
    type: {
      type: String as PropType<NormalTypes>,
      default: 'default',
    },
    loadType: {
      type: String as PropType<LoadingTypes>,
      default: 'default',
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const setColor = computed(() => {
      const { color } = props
      if (color) {
        return {
          background: color,
        } as CSSProperties
      }
      return ''
    })

    const setClass = computed(() => {
      const { size, type } = props
      const names = []
      names.push(type)
      names.push(size)
      return names.join(' ')
    })

    const defaultLoad = () => {
      return (
        <>
          {new Array(3).fill(0).map((item, i) => (
            <i
              class={`loading__default ${setClass.value}`}
              style={setColor.value}
              key={item + i}
            ></i>
          ))}
        </>
      )
    }

    const cubeLoad = () => {
      return (
        <>
          {new Array(4).fill(0).map((item, i) => (
            <i
              class={`loading__cube ${setClass.value}`}
              style={setColor.value}
              key={item + i}
            ></i>
          ))}
        </>
      )
    }

    const waveLoad = () => {
      return (
        <>
          {new Array(5).fill(0).map((item, i) => (
            <i
              class={`loading__wave ${setClass.value}`}
              style={setColor.value}
              key={item + i}
            ></i>
          ))}
        </>
      )
    }

    const renderLoad = computed(() => {
      const { loadType } = props
      if (loadType === 'cube') return cubeLoad()
      if (loadType === 'wave') return waveLoad()
      return defaultLoad()
    })

    return () => (
      <div class="fect-loading">
        <span class="loading">{renderLoad.value}</span>
      </div>
    )
  },
})
