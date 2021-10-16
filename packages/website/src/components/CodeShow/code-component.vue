<template>
  <div class="fect-doc__code-component">
    <component :is="name" ref="renderRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, ComponentPublicInstance } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { READONLY_DOCS_CODESHOW_KEY, CodeShowProvide } from './type'

export default defineComponent({
  name: 'CodeComponent',
  setup(props) {
    const renderRef = ref<ComponentPublicInstance & { _: any }>()
    const { context } = useProvider<CodeShowProvide>(READONLY_DOCS_CODESHOW_KEY)
    const { name, setpreViewCode } = context!
    // onMounted(() => {
    //   if (renderRef.value) {
    //     const codes = renderRef.value._.type._meta().default
    //     setpreViewCode(codes)
    //   }
    // })

    return {
      renderRef,
      name,
    }
  },
})
</script>

<style lang="less" scoped>
.fect-doc__code-component {
  width: 100%;
  padding: var(--fay-gap);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  > div {
    min-width: 100%;
    width: initial;
  }
}
</style>
