<template>
  <div class="preview">
    <details :open="visible">
      <summary @click="clickHandler">
        <div class="summary">
          <div class="action">
            <span :class="[visible ? 'arrow roate' : 'arrow']">
              <chevron-right :size="16" />
            </span>
          </div>
          <div class="action">
            <span v-show="visible" @click="copyHandler" class="copy" title="Copy Code">
              <copy :size="18" />
            </span>
          </div>
        </div>
      </summary>
      <div class="raw">
        <fe-code block v-html="parserdCode" />
      </div>
    </details>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, getCurrentInstance } from 'vue'
import { useClipboard } from '@fect-ui/vue-hooks'
import Prism from 'prismjs'
export default defineComponent({
  name: 'Preview',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { proxy } = getCurrentInstance()
    const { copyText } = useClipboard()
    const codeRef = ref<HTMLElement>(null)

    const visible = ref<boolean>(false)
    const updateVisible = () => (visible.value = !visible.value)

    const clickHandler = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      updateVisible()
    }

    const copyHandler = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      copyText(decodeURIComponent(props.code))
      ;(proxy as any).$toast({ text: 'code copied.' })
    }

    const parserdCode = computed(() => Prism.highlight(decodeURIComponent(props.code), Prism.languages.html, 'html'))

    return { parserdCode, codeRef, visible, updateVisible, clickHandler, copyHandler }
  }
})
</script>

<style lang="less" scoped>
.preview {
  border-bottom-left-radius: var(--fect-radius);
  border-bottom-right-radius: var(--fect-radius);
}
.preview details {
  transition: all 0.2s ease;
  overflow: hidden;
  border-bottom-left-radius: var(--fect-radius);
  border-bottom-right-radius: var(--fect-radius);
  summary {
    box-sizing: border-box;
    border-top: 1px solid var(--accents-2);
    color: var(--accents-5);
    width: 100%;
    list-style: none;
    user-select: none;
    outline: none;
    &::-webkit-details-marker {
      display: none;
    }
  }
}
.summary {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.875rem;
  padding: 0 var(--fect-gap);
  > svg {
    cursor: pointer;
  }
}

.action {
  width: auto;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
}

.arrow {
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.arrow.roate {
  transform: rotate(90deg);
}

.copy {
  display: inline-flex;
  align-items: center;
  transition: color 0.2s ease;
  color: var(--accents-4);
  &:hover {
    color: var(--accents-6);
  }
}

.raw {
  position: relative;
  box-sizing: border-box;
  white-space: pre;
  font-size: 1em;
  overflow: hidden;
  border-top: 1px solid var(--accents-2);
  padding: var(--fect-gap-half);
}
</style>
