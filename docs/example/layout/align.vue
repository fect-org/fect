<template>
  <div>
    <fect-row style="margin-bottom:10px;" gutter="15">
      <fect-col span="16">
        <div class="ex-col" :style="rightGap(8)"></div>
      </fect-col>
    </fect-row>

    <fect-row style="margin-bottom:10px;" gutter="15" justify="center">
      <fect-col span="16">
        <div class="ex-col" :style="rightGap(8)"></div>
      </fect-col>
    </fect-row>

    <fect-row style="margin-bottom:10px;" gutter="15" justify="end">
      <fect-col span="16">
        <div class="ex-col" :style="rightGap(8)"></div>
      </fect-col>
    </fect-row>

    <fect-row style="margin-bottom:10px;" gutter="15">
      <fect-col :span="6">
        <fect-row style="height:100%;">
          <div class="ex-col" :style="rightGap(12)"></div>
        </fect-row>
      </fect-col>
      <fect-col :span="6">
        <fect-row style="height:100%;" align="top">
          <fect-col>
            <div class="ex-col" :style="rightGap(8)"></div>
          </fect-col>
        </fect-row>
      </fect-col>
      <fect-col :span="6">
        <fect-row style="height:100%;" align="middle">
          <fect-col>
            <div class="ex-col" :style="rightGap(6)"></div>
          </fect-col>
        </fect-row>
      </fect-col>
      <fect-col :span="6">
        <fect-row style="height:100%;" align="bottom">
          <fect-col>
            <div class="ex-col" :style="rightGap(3)"></div>
          </fect-col>
        </fect-row>
      </fect-col>
    </fect-row>
  </div>
</template>

<script>
export default {
  name: 'ex-layout-align',
  setup() {
    const rightGap = (val) => {
      return { padding: `${val}pt` }
    }
    return {
      rightGap,
    }
  },
}
</script>

<style scoped>
.ex-col {
  border-radius: 5px;
  width: 100%;
  background-color: #0070f3;
}
</style>
