import { computed, defineComponent } from 'vue'
import { createName, isArray, createBem } from '../utils'
import { props } from './props'
import LoadingCircle from './loading-circle'
import './index.less'

const name = createName('Loading')
const bem = createBem('fect-loading')

export default defineComponent({
  name,
  props,
  setup(props) {
    const setLoadingStyles = computed(() => {
      const { color, loadType } = props
      if (!color) return
      /**
       * When loadType equal circle , we can't give it any color.
       * Because LoadingCricle component is svg. So we only do this. :)
       */
      const beArrColor = isArray(color)

      if (loadType === 'circle')
        return {
          color: beArrColor ? 'initial' : color
        }
      return {
        background: beArrColor ? `linear-gradient(${color.join()})` : color
      }
    })

    /**
     * follow variable is loading type should fill element count.
     */
    const wave = 5
    const cube = 4
    const normal = 3

    const setLoadClasses = computed(
      () =>
        bem(props.loadType, {
          size: props.size
        }) + ` ${props.type}`
    )

    const getLoadNum = computed(() => {
      const { loadType } = props
      if (loadType === 'circle') return null
      const loader = { wave, default: normal, cube }
      return loader[loadType] || loader.default
    })

    return () => (
      <div class="fect-loading">
        <span class={bem('wrapper')}>
          {getLoadNum.value ? (
            [...Array(getLoadNum.value)].map((_, i) => (
              <i class={setLoadClasses.value} style={setLoadingStyles.value} key={i} />
            ))
          ) : (
            <LoadingCircle class={setLoadClasses.value} style={setLoadingStyles.value} />
          )}
        </span>
      </div>
    )
  }
})
