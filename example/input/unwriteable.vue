<template>
  <div>
    <fe-input placeholder="禁用" disabled />
    <fe-spacer :y="0.5" />
    <fe-input placeholder="只读" readonly />
  </div>
</template>

<script>
export default {
  name: 'ExInputUnwriteable'
}
</script>
