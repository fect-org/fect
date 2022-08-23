<template>
  <div>
    <fe-avatar :src="img" />
    <fe-avatar :src="img" />
    <fe-avatar :src="img" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExAvatarDefault',
  setup() {
    const img = 'https://avatars.githubusercontent.com/u/52351095?v=4'

    return {
      img
    }
  }
}
</script>
