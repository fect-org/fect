<template>
  <fe-grid-group :gap="2" justify="center">
    <fe-grid :xs="24">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="12">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="12">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="6">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="6">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="6">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="6">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="6">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="12">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="6">
      <fe-card class="card" shadow />
    </fe-grid>
  </fe-grid-group>
</template>

<script>
export default {
  name: 'ex-grid-fluid'
}
</script>

<style scoped>
.card {
  width: 100%;
  height: 50px;
}
</style>
