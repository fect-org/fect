<template>
  <div>
    <fe-textarea placeholder="禁用" disabled />
    <fe-spacer :y="0.5" />
    <fe-textarea placeholder="只读" readonly />
  </div>
</template>

<script>
export default {
  name: 'ExTextareaUnwriteable'
}
</script>
