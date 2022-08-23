<template>
  <fe-checkboxGroup v-model="group" use-row>
    <fe-checkbox :label="city">{{ city }}</fe-checkbox>
    <fe-checkbox label="beijing">beijing</fe-checkbox>
  </fe-checkboxGroup>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExCheckboxGroup',
  setup() {
    const city = ref('xiamen')
    const group = ref(['xiamen'])
    return {
      city,
      group
    }
  }
}
</script>
