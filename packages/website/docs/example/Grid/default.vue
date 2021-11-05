<template>
  <fe-grid-group jusitfy="content" :gap="2">
    <fe-grid :xs="24">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="6">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="6">
      <fe-card class="card" shadow />
    </fe-grid>
  </fe-grid-group>
</template>

<script>
export default {
  name: 'ex-grid-default',
}
</script>

<style scoped>
.card {
  width: 100%;
  height: 100px;
}
</style>
