<template>
  <div>
    <!--  -->
    <!-- :src="ava" -->
    <fay-avatar :src="ava" text="112221" style="" size="mini" />
    <fay-avatar :src="ava" text="112221" style="" size="small" />
    <fay-avatar :src="ava" text="112221" style="" />
    <fay-avatar text="Xery" size="large" />
    <fay-avatar text="Xery" isSquare size="large" />
    <fay-avatar-group></fay-avatar-group>
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
