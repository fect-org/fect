<template>
  <div>
    <fe-row style="margin-bottom:10px;" gutter="15">
      <fe-col span="16">
        <div class="ex-col" :style="rightGap(8)"></div>
      </fe-col>
    </fe-row>

    <fe-row style="margin-bottom:10px;" gutter="15" justify="center">
      <fe-col span="16">
        <div class="ex-col" :style="rightGap(8)"></div>
      </fe-col>
    </fe-row>

    <fe-row style="margin-bottom:10px;" gutter="15" justify="end">
      <fe-col span="16">
        <div class="ex-col" :style="rightGap(8)"></div>
      </fe-col>
    </fe-row>

    <fe-row style="margin-bottom:10px;" gutter="15">
      <fe-col :span="6">
        <fe-row style="height:100%;">
          <div class="ex-col" :style="rightGap(12)"></div>
        </fe-row>
      </fe-col>
      <fe-col :span="6">
        <fe-row style="height:100%;" align="top">
          <fe-col>
            <div class="ex-col" :style="rightGap(8)"></div>
          </fe-col>
        </fe-row>
      </fe-col>
      <fe-col :span="6">
        <fe-row style="height:100%;" align="middle">
          <fe-col>
            <div class="ex-col" :style="rightGap(6)"></div>
          </fe-col>
        </fe-row>
      </fe-col>
      <fe-col :span="6">
        <fe-row style="height:100%;" align="bottom">
          <fe-col>
            <div class="ex-col" :style="rightGap(3)"></div>
          </fe-col>
        </fe-row>
      </fe-col>
    </fe-row>
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
