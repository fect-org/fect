<template>
  <div>
    <fe-grid-group justify="center" :gap="2">
      <fe-grid xs>
        <fe-card class="card" shadow />
      </fe-grid>
      <fe-grid xs>
        <fe-card class="card" shadow />
      </fe-grid>
      <fe-grid xs>
        <fe-card class="card" shadow />
      </fe-grid>
    </fe-grid-group>
    <fe-grid-group justify="center" :gap="2">
      <fe-grid xs>
        <fe-card class="card" shadow />
      </fe-grid>
      <fe-grid :xs="12">
        <fe-card class="card" shadow />
      </fe-grid>
      <fe-grid xs>
        <fe-card class="card" shadow />
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script>
export default {
  name: 'ex-grid-auto',
}
</script>

<style scoped>
.card {
  height: 50px;
  width: 100%;
}
</style>
