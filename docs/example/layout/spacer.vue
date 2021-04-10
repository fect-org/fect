<template>
  <div>
    <fect-row
      style="margin-bottom:10px;"
      gutter="15"
      v-for="temp in 2"
      :key="temp"
    >
      <fect-col v-for="(ex, idx) in 3" :key="idx">
        <div class="ex-block"></div>
      </fect-col>
    </fect-row>
  </div>
</template>

<script>
export default {
  name: 'ex-layout-spacer',
}
</script>

<style scoped>
.ex-block {
  border-radius: 5px;
  background-color: #0070f3;
  padding: 8pt;
}
</style>
