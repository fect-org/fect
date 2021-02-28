<template>
  <div>
    <!--  -->
    <!-- :src="ava" -->
    <fay-avatar :src="ava" text="112221" style="" size="mini" />
    <fay-avatar :src="ava" text="112221" style="" size="small" />
    <fay-avatar :src="ava" text="112221" style="" />
    <fay-avatar text="Xery" size="large" />
    <fay-avatar text="Xery" isSquare size="large" />
    <div style="width: 150px">
      <fay-avatar-group count="1">
        <fay-avatar text="Yue" stacked style="color: red" />
        <fay-avatar text="Xery" stacked style="color: blue" />
        <fay-avatar :src="ava" stacked text="112221" style="" />
      </fay-avatar-group>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, toRef } from 'vue'
// @ is an alias to /src
import testAvatar from './test.jpg'
export default {
  components: {},
  data() {
    return {
      ava: testAvatar,
    }
  },
  methods: {
    handleTest(e) {
      console.log(e)
    },
  },
}
</script>
