<template>
  <div>
    <fe-switch size="mini" v-model="value1" />
    <fe-spacer />
    <fe-switch size="small" v-model="value2" />
    <fe-spacer />
    <fe-switch size="medium" v-model="value3" />
    <fe-spacer />
    <fe-switch size="large" v-model="value4" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-switch-size',
  setup() {
    const value1 = ref(1)
    const value2 = ref(1)
    const value3 = ref(2)
    const value4 = ref(3)
    return {
      value1,
      value2,
      value3,
      value4
    }
  }
}
</script>
