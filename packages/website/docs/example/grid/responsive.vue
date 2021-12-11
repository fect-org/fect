<template>
  <div>
    <fe-grid-group justify="center" :gap="2">
      <fe-grid :xs="24" :md="12">
        <fe-card class="card" shadow />
      </fe-grid>
      <fe-grid :xs="24" :md="12">
        <fe-card class="card" shadow />
      </fe-grid>
      <fe-grid :xs="12" :md="6">
        <fe-card class="card" shadow />
      </fe-grid>
      <fe-grid :xs="12" :md="6">
        <fe-card class="card" shadow />
      </fe-grid>
      <fe-grid :xs="12" :md="6">
        <fe-card class="card" shadow />
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script>
export default {
  name: 'ex-grid-responsive'
}
</script>

<style scoped>
.card {
  width: 100%;
  height: 50px;
}
</style>
