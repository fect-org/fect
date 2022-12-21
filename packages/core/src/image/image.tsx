import { computed, CSSProperties, defineComponent, onMounted } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { isNumber, assign } from '@fect-ui/shared'
import { createName } from '../utils'
import Skeleton from '../skeleton'
import SkeletonItem from '../skeleton-item'
import './index.less'

const name = createName('Image')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      default: ''
    },
    skeleton: Boolean,
    maxDelay: {
      type: [String, Number],
      default: 3000
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    height: {
      type: [Number, String],
      default: 'auto'
    }
  },
  setup(props, { attrs }) {
    const [loading, setLoading] = useState<boolean>(true)

    onMounted(() => {
      const { maxDelay, skeleton } = props
      // user may pass  a non-number. In order to avoid program errors, we need to give a default value.
      const delay = isNumber(maxDelay) ? Number(maxDelay) : 3000
      let timer: number | undefined
      timer && window.clearTimeout(timer)
      if (skeleton) {
        setLoading(false)
        timer = window.setTimeout(() => {
          setLoading(true)
          window.clearTimeout(timer)
        }, delay)
      }
    })

    const setImageStyle = computed(() => {
      const { width, height } = props
      const style: CSSProperties = {
        width,
        height
      }
      return style
    })

    const slots = {
      default: () => <img src={props.src} width={props.width} height={props.height} {...attrs} />,
      skeleton: () => (
        <SkeletonItem
          variable="image"
          style={assign(setImageStyle.value, {
            marginTop: 0
          })}
        />
      )
    }

    return () => (
      <div class="fect-image" style={setImageStyle.value}>
        <Skeleton loading={loading.value} v-slots={slots}></Skeleton>
      </div>
    )
  }
})
