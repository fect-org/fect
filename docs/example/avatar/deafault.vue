<template>
  <div>
    <fect-avatar :src="img" />
    <fect-avatar :src="img" />
    <fect-avatar :src="img" />
  </div>
</template>

<script>
export default {
  name: 'ex-avatar-default',
  setup() {
    const img = 'https://avatars.githubusercontent.com/u/52351095?v=4'
    return {
      img,
    }
  },
}
</script>
