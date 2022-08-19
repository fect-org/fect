<template>
  <div class="search">
    <fe-modal v-model:visible="visible">
      <template #title />
      <template #action />
      <fe-input v-model="input" class="input" placeholder="Search a component" clearable />
      <search-result v-show="resultVisible" />
    </fe-modal>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useKeyboard, KeyCode, KeyMod } from '@fect-ui/vue/src'
import SearchResult from './search-result.vue'
export default defineComponent({
  components: { SearchResult },
  setup() {
    const visible = ref(false)
    const resultVisible = ref(false)
    const input = ref('')

    const initlizeKeyboardState = () => {
      visible.value = true
      resultVisible.value = false
    }

    useKeyboard(initlizeKeyboardState, [KeyMod.CtrlCmd, KeyCode.KEY_K])

    watch(
      () => input.value,
      () => {
        if (input.value) {
          resultVisible.value = true
        } else {
          resultVisible.value = false
        }
      }
    )

    return {
      visible,
      resultVisible,
      input
    }
  }
})
</script>

<style lang="less" scoped>
.search {
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
}

.input {
  border: none;
  border-radius: 0;
  &:hover {
    border: none;
  }
}
</style>
