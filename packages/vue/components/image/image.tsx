import { computed, ref, watchEffect, CSSProperties, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import ImgSkeleton from './image-skeleton'
import './index.less'

const name = createName('Image')

export default defineComponent({
  name,
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
  setup(props, { attrs }) {
    const imgRef = ref<HTMLImageElement>()

    const [loading, setLoading] = useState<boolean>(true)
    const [showSkeleton, setShowSkeleton] = useState<boolean>(props.skeleton)

    watchEffect((onInvalidate) => {
      const timer = setTimeout(() => {
        if (!imgRef.value) return
        if (imgRef.value.complete) {
          setLoading(false)
          setShowSkeleton(false)
        }
      }, Number(props.maxDelay))
      onInvalidate(() => {
        clearTimeout(timer)
      })
    })

    const setStyle = computed(() => {
      const { width, height } = props
      const style: CSSProperties = {
        width,
        height,
      }
      return style
    })

    const renderNormal = () => (
      <div class="fect-image" style={setStyle.value}>
        {showSkeleton.value && <ImgSkeleton opacity={loading.value ? 0.5 : 0} />}
        <img
          ref={imgRef}
          src={props.src}
          width={props.width}
          height={props.height}
          style={{ display: showSkeleton.value ? 'none' : 'block' }}
          {...attrs}
        />
      </div>
    )

    return () => renderNormal()
  },
})
