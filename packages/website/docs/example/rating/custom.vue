<template>
  <div>
    <!-- <fe-rating v-model="val" :icon="icon" locked @change="handleChange" /> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { github } from '@fect-ui/vue-icons'
export default {
  name: 'ExRatingCustom',
  setup() {
    const val = ref(3)
    const icon = github
    return { val, icon }
  },
}
</script>
