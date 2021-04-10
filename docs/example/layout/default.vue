<template>
  <div>
    <fect-row
      v-for="ex in 2"
      :key="ex"
      style="margin-bottom:10px;background-color:#0070f3;border-radius:6px;"
    >
      <fect-spacer />
    </fect-row>
  </div>
</template>

<script>
export default {
  name: 'ex-layout-default',
}
</script>
