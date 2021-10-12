<template>
  <fe-row style="margin-bottom:10px;" gutter="15">
    <fe-col span="16">
      <div class="ex-col"></div>
    </fe-col>
    <fe-col span="8">
      <div class="ex-col"></div>
    </fe-col>
  </fe-row>
  <fe-row style="margin-bottom:10px;" gutter="15">
    <fe-col span="8">
      <div class="ex-col"></div>
    </fe-col>
    <fe-col span="8">
      <div class="ex-col"></div>
    </fe-col>
    <fe-col span="4">
      <div class="ex-col"></div>
    </fe-col>
    <fe-col span="4">
      <div class="ex-col"></div>
    </fe-col>
  </fe-row>
  <fe-row gutter="15">
    <fe-col span="4">
      <div class="ex-col"></div>
    </fe-col>
    <fe-col span="16">
      <div class="ex-col"></div>
    </fe-col>
    <fe-col span="4">
      <div class="ex-col"></div>
    </fe-col>
  </fe-row>
</template>

<script>
export default {
  name: 'ex-layout-compose',
}
</script>

<style scoped>
.ex-col {
  border-radius: 5px;
  background-color: #0070f3;
  padding: 8pt;
}
</style>
