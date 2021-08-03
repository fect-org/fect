import { computed, ref, watchEffect, CSSProperties } from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { createNameSpace } from '../utils'
import ImgSkeleton from './image-skeleton'
import ImageBrowser from './image-browser'
import { BrowserColors, READONLY_IMAGE_KEY } from './type'
import './index.less'

const [createComponent] = createNameSpace('Image')

const queryBrowserColors = (invert: boolean): BrowserColors => {
  return (
    (invert && {
      color: 'var(--primary-background)',
      barBgColor: 'var(--primary-foreground)',
      inputBgColor: 'var(--accents-8)',
      borderColor: 'var(--accents-7)',
      titleColor: 'var(--accents-2)',
    }) || {
      color: 'var(--primary-foreground)',
      barBgColor: 'var(--primary-background)',
      inputBgColor: 'var(--accents-1)',
      borderColor: 'var(--accents-2)',
      titleColor: 'var(--accents-5)',
    }
  )
}

const getHostFormUrl = (url: string) => {
  try {
    return new URL(url).host
  } catch (error) {
    return url
  }
}

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
    useBrowser: Boolean,
    url: {
      type: String,
      default: '',
    },
    showFullLink: Boolean,
    title: {
      type: String,
      default: '',
    },
    invert: Boolean,
  },
  setup(props, { attrs }) {
    const imgRef = ref<HTMLImageElement>()
    const loading = ref<boolean>(true)
    const showSkeleton = ref(props.skeleton)

    const { provider } = createProvider(READONLY_IMAGE_KEY)

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

    const setStyle = computed(() => {
      const { width, height } = props
      const style: CSSProperties = {
        width,
        height,
      }
      return style
    })

    const showLinkType = computed(() => {
      const { showFullLink, url } = props
      return (showFullLink && url) || getHostFormUrl(url)
    })

    const setHead = computed(() => {
      const { title, url } = props
      let show = false
      if (url) show = true
      return { head: show ? url : title, show }
    })

    const setColors = computed(() => queryBrowserColors(props.invert))

    const renderNormal = () => (
      <div class="fect-image" style={setStyle.value}>
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

    provider({ setColors, showLinkType, setHead })

    return () => (
      <>
        {props.useBrowser ? (
          <ImageBrowser {...attrs}>{renderNormal()}</ImageBrowser>
        ) : (
          renderNormal()
        )}
      </>
    )
  },
})
