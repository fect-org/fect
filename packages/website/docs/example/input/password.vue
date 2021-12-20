<template>
  <div>
    <fe-input placeholder="请输入" v-model="value" type="password" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExInputPassword',
  setup() {
    const value = ref(123456789)

    return {
      value
    }
  }
}
</script>
