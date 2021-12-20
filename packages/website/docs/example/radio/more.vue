<template>
  <div>
    <fe-radio value="1" disabled size="mini">Radio</fe-radio>
    <fe-radio value="2">Radio2</fe-radio>
    <fe-radioGroup use-row size="small">
      <fe-radio value="1">Radio</fe-radio>
      <fe-radio value="2">Radio2</fe-radio>
    </fe-radioGroup>
    <fe-radioGroup use-row disabled>
      <fe-radio value="1">Radio</fe-radio>
      <fe-radio value="2" checked>Radio2</fe-radio>
    </fe-radioGroup>
  </div>
</template>

<script>
export default {
  name: 'ExRadioMore'
}
</script>
