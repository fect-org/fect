<template>
  <fect-row style="margin-bottom:10px;" gutter="15">
    <fect-col span="16">
      <div class="ex-col"></div>
    </fect-col>
    <fect-col span="8">
      <div class="ex-col"></div>
    </fect-col>
  </fect-row>
  <fect-row style="margin-bottom:10px;" gutter="15">
    <fect-col span="8">
      <div class="ex-col"></div>
    </fect-col>
    <fect-col span="8">
      <div class="ex-col"></div>
    </fect-col>
    <fect-col span="4">
      <div class="ex-col"></div>
    </fect-col>
    <fect-col span="4">
      <div class="ex-col"></div>
    </fect-col>
  </fect-row>
  <fect-row gutter="15">
    <fect-col span="4">
      <div class="ex-col"></div>
    </fect-col>
    <fect-col span="16">
      <div class="ex-col"></div>
    </fect-col>
    <fect-col span="4">
      <div class="ex-col"></div>
    </fect-col>
  </fect-row>
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
