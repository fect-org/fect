<template>
  <div>
    <!-- <fay-button class="IamNiDie" shadow type="success">A</fay-button> -->
    <fay-spacer />
    <fay-button class="IamNiDie">A</fay-button>
    <fay-spacer />
    <fay-capacity value="10" />
    <fay-spacer />
    <fay-capacity value="35" />
    <fay-spacer />
    <fay-capacity :value="count" />
    <fay-spacer />
    <fay-capacity value="61" color="blue" />
    <fay-spacer />
    <!-- disabled -->
    <fay-button @click="handleTest" size="large">B</fay-button>
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
    // onMounted(() => {
    //   // console.log(DotRef.value)
    // })
    const handleTest = (e) => {
      count.value++
    }
    onMounted(() => {})
    return {
      handleTest,
      count,
    }
  },
}
</script>
