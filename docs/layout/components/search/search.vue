<template>
  <div class="search-container">
    <fe-modal v-model:visible="visible">
      <template #title />
      <template #action />
      <fe-input class="input" placeholder="Search a component" clearable />
    </fe-modal>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useKeyboard, KeyCode, KeyMod } from '@fect-ui/vue/src'
export default defineComponent({
  setup() {
    const visible = ref(false)
    useKeyboard(() => {
      visible.value = true
    }, [KeyMod.CtrlCmd, KeyCode.KEY_K])

    return {
      visible
    }
  }
})
</script>

<style lang="less" scoped>
:deep(.fect-input) {
  width: 100% !important;
}

:deep(.fect-input__wrapper) {
  border: none !important;
  border-radius: 0 !important;
  &:hover {
    border: none !important;
  }
}

.input {
  border: none;
  border-radius: 0;
  &:hover {
    border: none;
  }
}
</style>
