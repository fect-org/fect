<template>
  <div>
    <fe-button type="success" ghost>Button</fe-button>
    <fe-spacer :y="0.5" />
    <fe-button type="warning" loading load-type="wave" ghost>Button</fe-button>
    <fe-spacer :y="0.5" />
    <fe-button type="error" ghost>Button</fe-button>
  </div>
</template>

<script>
export default {
  name: 'ExButtonGhost'
}
</script>
