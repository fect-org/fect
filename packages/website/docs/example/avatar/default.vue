<template>
  <div>
    <fe-form :model="data">
      <fe-form-item label="开关">
        <fe-switch>xx</fe-switch>
      </fe-form-item>
    </fe-form>
    <!-- <fe-avatar :src="img" />
    <fe-avatar :src="img" />
    <fe-avatar :src="img" /> -->
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-avatar-default',
  setup() {
    const img = 'https://avatars.githubusercontent.com/u/52351095?v=4'

    const data = ref({
      dark: false,
      age: '',
    })

    return {
      img,
      data,
    }
  },
}
</script>
