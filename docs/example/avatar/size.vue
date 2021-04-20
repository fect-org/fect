<template>
  <div>
    <fe-avatar :src="img" size="mini" />
    <fe-avatar :src="img" size="small" />
    <fe-avatar :src="img" size="medium" />
    <fe-avatar :src="img" size="large" />
  </div>
</template>

<script>
export default {
  name: 'ex-avatar-size',
  setup() {
    const img = 'https://avatars.githubusercontent.com/u/52351095?v=4'
    return { img }
  },
}
</script>
