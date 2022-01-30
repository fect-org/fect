<template>
  <div>
    <fe-tooltip trigger="click" content="遵循immutable风格才能写更好的代码">
      <fe-button auto size="mini">点击</fe-button>
    </fe-tooltip>
    <fe-spacer :x="1" inline />
    <fe-tooltip content="函数变量要先声明在使用">
      <fe-badge>悬停的</fe-badge>
    </fe-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ExTooltipTrigger'
}
</script>
