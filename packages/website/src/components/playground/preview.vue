<template>
  <div class="fect-doc__playground-preview">
    <div class="fect-doc__playground-operations">
      <copy size="20" @click="copyClickHandler" />
      <icon-code size="20" @click="previewClickHandler" />
    </div>
    <div>
      <pre v-show="visible"><code ref="previewRef"></code></pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentPublicInstance, ref, watch } from 'vue'
import { useClipboard, useState } from '@fect-ui/vue-hooks'
import { code as Code } from '@fect-ui/vue-icons'
import Prism from 'prismjs'
export default defineComponent({
  name: 'Preview',
  components: {
    iconCode: Code,
  },
  props: {
    code: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const previewRef = ref<HTMLDivElement>()
    const [visible, setVisible] = useState<boolean>(false)
    const { proxy } = getCurrentInstance()!
    const { copyText } = useClipboard()
    const previewClickHandler = () => {
      setVisible(!visible.value)
    }
    const copyClickHandler = () => {
      copyText(props.code)
      if (proxy) {
        const { $toast } = proxy as ComponentPublicInstance<{
          $toast: any
        }>
        $toast.success({ text: 'copy success~' })
      }
    }

    watch(visible, (pre) => {
      if (pre) {
        console.log(pre)
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
    }
  },
})
</script>

<style lang="less" scoped>
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
      margin-top: 5px;
      // border: 0;
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
