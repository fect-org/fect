<template>
  <div>
    <fect-radio value="1" disabled size="mini">Radio</fect-radio>
    <fect-radio value="2">Radio2</fect-radio>
    <fect-radioGroup useRow size="small">
      <fect-radio value="1">Radio</fect-radio>
      <fect-radio value="2">Radio2</fect-radio>
    </fect-radioGroup>
    <fect-radioGroup useRow disabled>
      <fect-radio value="1">Radio</fect-radio>
      <fect-radio value="2" checked>Radio2</fect-radio>
    </fect-radioGroup>
  </div>
</template>

<script>
export default {
  name: 'ex-radio-more',
}
</script>
