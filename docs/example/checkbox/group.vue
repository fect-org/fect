<template>
  <fe-checkboxGroup v-model="group" useRow disabled>
    <fe-checkbox :label="city">{{ city }}</fe-checkbox>
    <fe-checkbox label="beijing">beijing</fe-checkbox>
  </fe-checkboxGroup>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-checkbox-group',
  setup() {
    const city = ref('xiamen')
    const group = ref(['xiamen', 'shanghai'])
    return {
      city,
      group,
    }
  },
}
</script>
