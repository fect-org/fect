<template>
  <div class="fect-doc__playground-preview" ref="contextRef">
    <div class="fect-doc__playground-operations">
      <copy size="20" @click="copyClickHandler" />
      <Code size="20" @click="previewClickHandler" />
    </div>
    <div class="raw-content">
      <pre v-show="visible" :style="{ width: previewWidth }"><code ref="previewRef"></code></pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentPublicInstance, ref, watch, onMounted } from 'vue'
import { useClipboard, useState } from '@fect-ui/vue-hooks'
import { useResize } from '@fect-ui/vue/components/utils'
import { Code } from '@fect-ui/vue-icons'
import Prism from 'prismjs'
export default defineComponent({
  name: 'Preview',
  components: {
    Code
  },
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const previewRef = ref<HTMLDivElement>()
    const contextRef = ref<HTMLDivElement>()
    const { width } = useResize()
    const [visible, setVisible] = useState<boolean>(false)
    const [previewWidth, setpreviewWidth] = useState<string>('auto')
    const { proxy } = getCurrentInstance()!
    const { copyText } = useClipboard()
    const previewClickHandler = () => {
      setVisible(!visible.value)
    }
    const copyClickHandler = () => {
      copyText(decodeURIComponent(props.code))
      if (proxy) {
        const { $toast } = proxy as ComponentPublicInstance<{
          $toast: any
        }>
        $toast.success({ text: 'Copied to clipboard!' })
      }
    }

    const updatePreviewWidth = () => {
      if (contextRef.value) {
        const width = `${contextRef.value.clientWidth - 30}px`
        setpreviewWidth(width)
      }
    }

    onMounted(updatePreviewWidth)
    watch(width, (pre) => updatePreviewWidth())

    watch(visible, (pre) => {
      if (pre) {
        const elSnapshot = previewRef.value
        if (elSnapshot) {
          elSnapshot.innerHTML = Prism.highlight(decodeURIComponent(props.code), Prism.languages.html, 'html')
        }
        return
      }
    })

    return {
      visible,
      previewRef,
      copyClickHandler,
      previewClickHandler,
      previewWidth,
      contextRef
    }
  }
})
</script>

<style lang="less" scoped>
.raw-content {
  overflow: hidden;
}

.fect-doc {
  &__playground-preview {
    margin-top: var(--fay-gap);
    border-top: 1px solid var(--accents-2);
    border-bottom-left-radius: var(--fay-radius);
    border-bottom-right-radius: var(--fay-radius);
    p {
      text-align: center;
      user-select: none;
      cursor: pointer;
      font-size: 0.875rem;
    }
    pre {
      // border: 0;
      margin: 0 auto;
      margin-top: 5px;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        width: 0;
      }
    }
  }
  &__playground-operations {
    text-align: right;
    padding-top: var(--fay-gap-half);
    svg {
      margin-right: 10px;
    }
  }
}
</style>
