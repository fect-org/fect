<template>
  <div>
    <fe-back-top :bottom="100" visibilityHeight="100">
      <div class="fect-back-top-custom">UP</div>
    </fe-back-top>
    Scroll down to see the bottom-right button.
  </div>
</template>

<script>
export default {
  name: 'ex-back-top-custom'
}
</script>

<style lang="less" scoped>
.fect-back-top-custom {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 14px;
}
</style>
