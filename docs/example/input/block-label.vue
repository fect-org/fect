<template>
  <div>
    <fe-input placeholder="请输入用户名">用户名</fe-input>
    <fe-spacer y="0.5" />
    <fe-input placeholder="GitHub Actions">
      <fe-dot type="success">
        <fe-code style="font-size:12px;">Deployment</fe-code>
      </fe-dot>
    </fe-input>
  </div>
</template>

<script>
export default {
  name: 'ex-input-block-label',
}
</script>
