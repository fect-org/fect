<template>
  <div>
    <fay-button>A</fay-button>
    <fay-card></fay-card>
    <fay-dot></fay-dot>
    <fay-avatar />
    <fay-avatar-group>
      <fay-avatar text="Xery" />
    </fay-avatar-group>
    <fay-link href="/test"></fay-link>
    <!-- <fay-button></fay-button> -->
    <!-- <a href="/test">W3School</a> -->
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
    const text = ref('Xery')
    // onMounted(() => {
    //   // console.log(DotRef.value)
    // })
    const handleTest = (e) => {
      text.value = text.value === 'yue' ? 'Xery' : 'yue'
      console.log(text.value)
    }
    return {
      text,
      handleTest,
    }
  },
}
</script>
