<template>
  <div>
    <fe-tag text="成功" type="success" use-invert round />
    <fe-spacer :y="0.5" />
    <fe-tag text="警告" type="warning" use-invert round />
    <fe-spacer :y="0.5" />
    <fe-tag text="错误的" type="error" round />
    <fe-spacer :y="0.5" />
  </div>
</template>

<script>
export default {
  name: 'ExTagRound'
}
</script>
