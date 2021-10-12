<template>
  <div>
    <fe-input placeholder="请输入" v-model="value" clearable />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-input-clearable',
  setup() {
    const value = ref('示例文字')

    return {
      value,
    }
  },
}
</script>
