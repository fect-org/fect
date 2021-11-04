<template>
  <div>
    <fe-button size="mini" auto>
      <template #icon><github /></template>
    </fe-button>
    <fe-spacer />
    <fe-button type="success">
      <template #icon><settings /></template>
      Button
    </fe-button>
    <fe-spacer />
    <fe-button type="success" ghost size="small">
      <template #icon><github /></template>
      Button
    </fe-button>
  </div>
</template>

<script>
export default {
  name: 'ExButtonIcon',
}
</script>
