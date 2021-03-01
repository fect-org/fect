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
        <fay-avatar stacked :text="text" style="color: red" />
        <fay-avatar text="Xery" stacked style="color: blue" />
        <fay-avatar :src="ava" stacked text="112221" style="" />
      </fay-avatar-group>
    </div>
    <fay-button @click="handleTest">按钮</fay-button>
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
  methods: {},
  setup(props) {
    const text = ref('Xery')
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
