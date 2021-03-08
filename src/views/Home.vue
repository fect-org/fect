<template>
  <div>
    <!-- disabled -->
    <!--  -->
    <fay-radio-group useRow size="large" @change="handleTest">
      <fay-radio value="3" class="test" style="color:red">7777</fay-radio>
      <fay-radio value="1">1117</fay-radio>
      <fay-radio value="2">7777</fay-radio>
    </fay-radio-group>
  </div>
</template>

<script>
import { onMounted, ref, toRef } from 'vue'
// @ is an alias to /src
import testAvatar from './test.jpg'
export default {
  data() {
    return {
      ava: testAvatar,
    }
  },

  methods: {},
  setup(props) {
    const count = ref(0)
    const handleTest = (e) => {
      count.value++
      console.log(e)
    }
    onMounted(() => {})
    return {
      handleTest,
      count,
    }
  },
}
</script>

<style lang="less" scoped>
.test {
  .fay-radio-point {
    &::before {
      background-color: blue !important;
    }
  }
}
</style>
