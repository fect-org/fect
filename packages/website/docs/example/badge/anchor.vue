<template>
  <div>
    <fe-badgeAnchor>
      <fe-avatar :src="img" size="medium" />
      <fe-badge type="success" dot></fe-badge>
    </fe-badgeAnchor>
    <fe-spacer inline x="1.1" />
    <fe-badgeAnchor>
      <fe-avatar :src="img" size="medium" isSquare />
      <fe-badge type="success" dot></fe-badge>
    </fe-badgeAnchor>
    <fe-spacer inline x="1.1" />
    <fe-badgeAnchor>
      <fe-button auto>Button</fe-button>
      <fe-badge type="error">999</fe-badge>
    </fe-badgeAnchor>
  </div>
</template>

<script>
export default {
  name: 'ex-badge-anchor',
  setup() {
    const img = 'https://avatars.githubusercontent.com/u/52351095?v=4'
    return {
      img,
    }
  },
}
</script>
