<template>
  <div>
    <fect-snippet text="yarn add @fect-ui/vue" width="300px" />
    <fect-spacer />
    <fect-snippet
      text="yarn add @fect-ui/vue"
      type="success"
      fill
      width="300px"
    />
    <fect-spacer />
    <fect-snippet
      text="yarn add @fect-ui/vue yarn add @fect-ui/vue yarn add @fect-ui/vue yarn add @fect-ui/vue"
      type="success"
      width="300px"
    />
  </div>
</template>
<script>
export default {
  name: 'ex-snippet-default',
}
</script>
