<template>
  <div>
    <fe-button size="mini" auto>
      <template #icon><Github /></template>
    </fe-button>
    <fe-spacer />
    <fe-button type="success">
      <template #icon><Settings /></template>
      Button
    </fe-button>
    <fe-spacer />
    <fe-button type="success" ghost size="small">
      <template #icon><Github /></template>
      Button
    </fe-button>
  </div>
</template>

<script>
export default {
  name: 'ExButtonIcon'
}
</script>
