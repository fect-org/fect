<template>
  <div>
    <fe-avatarGroup>
      <fe-avatar :src="img" stacked />
      <fe-avatar :src="img" stacked />
      <fe-avatar :src="img" stacked />
    </fe-avatarGroup>
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
