<template>
  <div>
    <fe-tag text="成功" type="success" useInvert />
    <fe-spacer y="0.5" />
    <fe-tag text="警告" type="warning" useInvert />
    <fe-spacer y="0.5" />
    <fe-tag text="错误的" type="error" useInvert />
    <fe-spacer y="0.5" />
  </div>
</template>

<script>
export default {
  name: 'ex-tag-invert',
}
</script>
