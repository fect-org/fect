<template>
  <div>
    <fe-avatarGroup stacked size="medium" is-square>
      <fe-avatar :src="img" />
      <fe-avatar :src="img" />
      <fe-avatar :src="img" />
    </fe-avatarGroup>
  </div>
</template>

<script>
export default {
  name: 'ExAvatarStacked',
  setup() {
    const img = 'https://avatars.githubusercontent.com/u/52351095?v=4'
    return { img }
  }
}
</script>
