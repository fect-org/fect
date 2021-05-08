<template>
  <div>
    <fe-image :src="img"></fe-image>
  </div>
</template>

<script>
export default {
  name: 'ex-image-default',
  setup() {
    const img = 'https://avatars.githubusercontent.com/u/52351095?v=4'
    return { img }
  },
}
</script>
