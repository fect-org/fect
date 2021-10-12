<template>
  <div>
    <fe-row>
      <fe-col
        class="ex-col"
        v-for="(ex, idx) in 2"
        :key="ex + idx"
        :style="rightColor(idx)"
      >
        <fe-spacer />
      </fe-col>
    </fe-row>
    <fe-row style="margin-top:10px">
      <fe-col
        class="ex-col"
        v-for="(ex, idx) in 2"
        :key="ex + idx"
        :span="!idx ? 3 : 21"
        :style="rightColor(idx)"
      >
        <fe-spacer />
      </fe-col>
    </fe-row>
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
