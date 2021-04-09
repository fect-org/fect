<template>
  <div>
    <fect-avatarGroup>
      <fect-avatar :src="img" stacked />
      <fect-avatar :src="img" stacked />
      <fect-avatar :src="img" stacked />
    </fect-avatarGroup>
  </div>
</template>

<script>
export default {
  name: 'ex-avatar-stacked',
  setup() {
    const img = 'https://avatars.githubusercontent.com/u/52351095?v=4'
    return { img }
  },
}
</script>
