<template>
  <fe-grid :gap="2" justify="center" container :xs="12">
    <fe-grid xs>
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid xs>
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid xs>
      <fe-card class="card" shadow />
    </fe-grid>
  </fe-grid>
  <!-- <fe-spacer />
  <fe-grid :gap="2" justify="center" container>
    <fe-grid xs>
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid :xs="12">
      <fe-card class="card" shadow />
    </fe-grid>
    <fe-grid xs>
      <fe-card class="card" shadow />
    </fe-grid>
  </fe-grid> -->
</template>

<script>
export default {
  name: 'ex-grid-auto',
}
</script>

<style scoped></style>
