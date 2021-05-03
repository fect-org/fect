<template>
  <div>
    <fe-input prefix="用户名" placeholder="一个基础的示例" size="small" />
    <fe-spacer y=".5" />
    <fe-input suffix=".com" placeholder="https://github" size="small" />
    <fe-spacer y=".5" />
    <fe-input prefix="https://" placeholder="github" suffix=".com" />
  </div>
</template>

<script>
export default {
  name: 'ex-input-inline-label',
}
</script>
