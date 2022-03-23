<template>
  <div>
    <fe-textarea v-model="value" auto-height />
  </div>
</template>

<script>
export default {
  name: 'ExTextareaAutoHeight',
  data() {
    return {
      value: '非常多文本非常多文本非常多文本非常多文本非常多文本非常多文本'
    }
  }
}
</script>
