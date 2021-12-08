<template>
  <div>
    <div>
      <span style="margin-right: 16px">切换 Loading</span>
      <fe-switch :checked="load" @change="handleChange" size="large" />
    </div>
    <fe-spacer />
    <fe-skeleton :loading="load">
      <template #skeleton>
        <fe-skeleton-item variable="image" style="width: 240px; height: 240px" />
      </template>
      <fe-image :src="img" style="width: 240px; height: 240px" />
    </fe-skeleton>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-skeleton-loading',
  setup() {
    const img = 'https://user-images.githubusercontent.com/52351095/118687359-7e809480-b837-11eb-8083-b0504ec79652.png'
    const load = ref(false)
    const handleChange = () => (load.value = !load.value)
    return {
      img,
      load,
      handleChange
    }
  }
}
</script>
