<template>
  <div>
    <fe-image :src="img" width="150px" height="150px" skeleton></fe-image>
  </div>
</template>

<script>
export default {
  name: 'ex-image-skeleton',
  setup() {
    const img = 'https://avatars.githubusercontent.com/u/52351095?v=4'
    return { img }
  },
}
</script>
