<template>
  <div>
    <div style="background: red; height: 50px; width: 50px">
      <fay-avatar src="./test.jpg" />
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
