<template>
  <div>
    <fect-avatar src="./img/avatar.png" size="mini" />
    <fect-avatar src="./img/avatar.png" size="small" />
    <fect-avatar src="./img/avatar.png" size="medium" />
    <fect-avatar src="./img/avatar.png" size="large" />
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
