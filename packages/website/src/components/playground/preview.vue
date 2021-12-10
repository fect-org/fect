<template>
  <div class="fect-doc__playground-preview" ref="contextRef">
    <div class="fect-doc__playground-operations">
      <template v-if="!isMobile">
        <fe-tooltip :content="tooltipText.copy">
          <Copy size="20" @click="copyClickHandler" />
        </fe-tooltip>
        <fe-tooltip :content="tooltipText.code">
          <Code size="20" @click="previewClickHandler" />
        </fe-tooltip>
      </template>
      <template v-else>
        <Copy size="20" @click="copyClickHandler" />
        <Code size="20" @click="previewClickHandler" />
      </template>
    </div>
    <div class="raw-content">
      <pre v-show="visible" :style="{ width: previewWidth }"><code ref="previewRef"></code></pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentPublicInstance, ref, watch, onMounted, computed } from 'vue'
import { useClipboard, useState } from '@fect-ui/vue-hooks'
import { useWebsiteContext } from '../../website-context'
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
    const [visible, setVisible] = useState<boolean>(false)
    const [previewWidth, setpreviewWidth] = useState<string>('auto')
    const { proxy } = getCurrentInstance()!
    const { copyText } = useClipboard()
    const { context } = useWebsiteContext()

    const previewClickHandler = () => {
      setVisible(!visible.value)
    }

    const tooltipText = computed(() => {
      const { currentLang } = context!
      const zhTooltips = {
        copy: '复制代码',
        code: '代码'
      }
      const enTooltips = {
        copy: 'Copy code',
        code: 'Code'
      }
      return currentLang.value === 'en-us' ? enTooltips : zhTooltips
    })

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
    watch(context!.width, (pre) => updatePreviewWidth())

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
      tooltipText,
      copyClickHandler,
      previewClickHandler,
      previewWidth,
      contextRef,
      isMobile: context!.mobile
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
      &:hover {
        cursor: pointer;
        opacity: 0.65;
      }
    }
  }
}
</style>
