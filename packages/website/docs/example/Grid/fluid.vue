<template>
  <fe-grid :gap="2" justify="center" container>
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
  </fe-grid>
</template>

<script>
export default {
  name: 'ex-grid-fluid',
}
</script>

<style scoped>
.card {
  width: 100%;
  height: 50px;
}
</style>
