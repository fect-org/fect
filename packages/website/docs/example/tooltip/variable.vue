<template>
  <div>
    <fe-tooltip content="上">
      <fe-button auto size="mini">top</fe-button>
    </fe-tooltip>
    <fe-spacer x="1" inline />
    <fe-tooltip content="右" type="success" placement="right" :visible-arrow="false">
      <fe-button auto size="mini">right</fe-button>
    </fe-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ex-tooltip-variable',
}
</script>
