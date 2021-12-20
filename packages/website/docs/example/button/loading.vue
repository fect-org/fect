<template>
  <div>
    <fe-button loading load-type="cube">Button</fe-button>
    <fe-spacer :y="0.5" />
    <fe-button loading load-type="wave" type="success">Button</fe-button>
    <fe-spacer :y="0.5" />
    <fe-button loading>Button</fe-button>
  </div>
</template>

<script>
export default {
  name: 'ExButtonLoading'
}
</script>
