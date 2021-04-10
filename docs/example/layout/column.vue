<template>
  <div>
    <fect-row>
      <fect-col
        class="ex-col"
        v-for="(ex, idx) in 2"
        :key="ex + idx"
        :style="rightColor(idx)"
      >
        <fect-spacer />
      </fect-col>
    </fect-row>
    <fect-row style="margin-top:10px">
      <fect-col
        class="ex-col"
        v-for="(ex, idx) in 2"
        :key="ex + idx"
        :span="!idx ? 3 : 21"
        :style="rightColor(idx)"
      >
        <fect-spacer />
      </fect-col>
    </fect-row>
  </div>
</template>

<script>
export default {
  name: 'ex-layout-column',
  setup() {
    const rightColor = (idx) => {
      return { backgroundColor: idx ? '#666' : 'var(--accents-2)' }
    }
    return {
      rightColor,
    }
  },
}
</script>

<style scoped>
.ex-col {
  border-radius: 6px;
}
</style>
