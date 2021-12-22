<template>
  <div>
    <fe-radioGroup v-model="val">
      <fe-radio value="1">Radio</fe-radio>
      <fe-radio value="2">Radio2</fe-radio>
    </fe-radioGroup>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExRadioGroup',
  setup() {
    const val = ref('1')
    return {
      val
    }
  }
}
</script>
