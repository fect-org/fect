<template>
  <fe-grid container :gap="2" justify="center">
    <fe-grid :xs="12" :sm="0">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="24">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="24">
      <fe-card class="card" shadow />
    </fe-grid>
  </fe-grid>
</template>

<script>
export default {
  name: 'ex-grid-hidden',
}
</script>

<style scoped>
.card {
  width: 100%;
  height: 50px;
}
</style>
