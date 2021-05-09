import { computed, ref, watchEffect } from 'vue'
import { createNameSpace } from '../utils'
import ImgSkeleton from './image-skeleton'
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
  setup(props, { attrs }) {
    const imgRef = ref(null)
    const loading = ref(true)
    const showSkeleton = ref(props.skeleton)

    watchEffect((onInvalidate) => {
      const timer = setTimeout(() => {
        if (!imgRef.value) return
        if (imgRef.value.complete) {
          loading.value = false
          showSkeleton.value = false
        }
      }, Number(props.maxDelay))
      onInvalidate(() => {
        clearTimeout(timer)
      })
    })

    const selfStyle = computed(() => {
      const style = {
        width: props.width,
        height: props.height,
      }
      return style
    })

    return () => (
      <div class="fect-image" style={selfStyle.value}>
        {showSkeleton.value && (
          <ImgSkeleton opacity={loading.value ? 0.5 : 0} />
        )}
        <img
          ref={imgRef}
          src={props.src}
          width={props.width}
          height={props.height}
          style={{ display: !showSkeleton.value ? 'block' : 'none' }}
          {...attrs}
        />
      </div>
    )
  },
})
