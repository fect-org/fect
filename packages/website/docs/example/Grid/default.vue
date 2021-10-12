<template>
  <fe-grid container justify="center" :gap="2">
    <fe-grid :xs="6">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="6">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="6">
      <fe-card class="card" shadow />
    </fe-grid>
  </fe-grid>
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
