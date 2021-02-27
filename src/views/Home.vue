<template>
  <div class="home">
    <!-- size="medium" -->
    <fay-button type="success" size="mini" @click="handleTest"
      >mini Button</fay-button
    >
    <p style="margin-top: 15px" />
    <fay-button type="success" shadow size="small" @click="handleTest"
      >small Button</fay-button
    >
    <p style="margin-top: 15px" />
    <fay-button type="success" loading @click="handleTest"
      >medium Button</fay-button
    >

    <p style="margin-top: 15px" />
    <fay-button type="success" size="large" @click="handleTest"
      >large Button</fay-button
    >
    <p style="margin-top: 15px" />
    <fay-button type="success" disabled size="large" @click="handleTest">
      <div>哈哈哈</div>
    </fay-button>
  </div>
</template>

<script>
import { onMounted, ref, toRef } from 'vue'
// @ is an alias to /src

export default {
  components: {},

  methods: {
    handleTest(e) {
      console.log(e)
    },
  },
}
</script>
