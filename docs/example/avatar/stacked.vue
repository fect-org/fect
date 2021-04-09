<template>
  <div>
    <fect-avatarGroup>
      <fect-avatar :src="img" />
      <fect-avatar :src="img" />
      <fect-avatar :src="img" />
    </fect-avatarGroup>
  </div>
</template>

<script>
export default {
  name: 'ex-avatar-group',
  setup() {
    const img = 'https://avatars.githubusercontent.com/u/52351095?v=4'
    return { img }
  },
}
</script>
