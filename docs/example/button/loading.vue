<template>
  <div>
    <fe-button loading size="large" load-type="cube">Button</fe-button>
    <fe-spacer :y="0.5" />
    <fe-button loading load-type="wave" type="success">Button</fe-button>
    <fe-spacer :y="0.5" />
    <fe-button loading size="small">Button</fe-button>
  </div>
</template>

<script>
export default {
  name: 'ex-button-loading',
}
</script>
