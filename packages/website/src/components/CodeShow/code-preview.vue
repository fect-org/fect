<template>
  <div class="fect-doc__codepreview">
    <details :open="visible">
      <summary @click="handlerClick">
        <fe-row
          justify="space-between"
          style="width:100%;height:100%;"
          align="middle"
        >
          <fe-col class="action">
            <span
              class="arrow"
              :style="{ transform: `rotate(${visible ? 90 : 0}deg)` }"
            >
              <chevron-right
            /></span>
            <span>浏览代码</span>
            <!-- ${visible ? 'active' : ''} -->
            <copy
              class="icons-transform"
              style="marginLeft:auto;marginRight:20px;"
              v-show="visible"
              size="20"
              @click="handlerCopyClick"
            />
          </fe-col>
        </fe-row>
      </summary>
      <div class="area">
        <prism language="html" v-if="code">{{ code }}</prism>
      </div>
    </details>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  getCurrentInstance,
  ComponentPublicInstance,
} from 'vue'
import { useClipboard, useProvider } from '@fect-ui/vue-hooks'
// import Prism from 'vue-prism-component'
import { CodeShowProvide, READONLY_DOCS_CODESHOW_KEY } from './type'

export default defineComponent({
  // components: { Prism },
  setup() {
    const visible = ref<boolean>(false)
    const { context } = useProvider<CodeShowProvide>(READONLY_DOCS_CODESHOW_KEY)
    const { code } = context!
    const { proxy } = getCurrentInstance()!
    const { copyText } = useClipboard()

    const handlerClick = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      visible.value = !visible.value
    }
    const handlerCopyClick = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      copyText(code.value)
      if (proxy) {
        const { $toast } = proxy as ComponentPublicInstance<{
          $toast: any
        }>
        $toast.success({ text: '复制成功~' })
      }
    }

    return {
      handlerClick,
      handlerCopyClick,
      visible,
      code,
    }
  },
})
</script>

<style scoped>
@import url('./animation.less');
</style>

<style lang="less" scoped>
.fect-doc__codepreview {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  details {
    background: var(--accents-1);
    transition: all 0.2s ease;
    overflow: hidden;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .area {
      background: var(--accents-1);
      position: relative;
      box-sizing: border-box;
      white-space: pre;
      font-size: 1em;
      overflow: hidden;
      pre {
        margin: 0;
        background: var(--primary-background);
        border: none;
        overflow-x: auto;
        &::-webkit-scrollbar {
          -webkit-overflow-scrolling: touch;
        }
        code {
          text-transform: none;
        }
      }
    }
  }

  summary {
    height: 35px;
    border-top: 1px solid var(--accents-2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--accents-5);
    list-style: none;
    user-select: none;
    outline: none;
    &::-webkit-details-marker {
      display: none;
    }
    .action {
      width: auto;
      display: flex;
      align-items: center;
      font-size: 13px;
    }
    svg {
      cursor: pointer;
    }
    .arrow {
      margin-left: 10px;
      transition: all 0.2s ease;
      // transform: rotate(90deg);
      display: inline-flex;
      align-items: center;
      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
    }
  }
}

.icons-transform {
  animation: copyIcon 1s ease;
  z-index: 5;
}
</style>
