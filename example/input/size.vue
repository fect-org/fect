<template>
  <div>
    <fe-input size="mini" placeholder="最小的" />
    <fe-spacer :y="0.5" />
    <fe-input size="small" placeholder="较小的" />
    <fe-spacer :y="0.5" />
    <fe-input size="medium" placeholder="中等的" />
    <fe-spacer :y="0.5" />
    <fe-input size="large" placeholder="较大的" />
  </div>
</template>

<script>
export default {
  name: 'ExInputSize'
}
</script>
