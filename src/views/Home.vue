<template>
  <div class="home">
    <!-- size="medium" -->
    <fay-Button type="success" size="mini" @click="handleTest"
      >mini Button</fay-Button
    >
    <p style="margin-top: 15px" />
    <fay-Button type="success" shadow size="small" @click="handleTest"
      >small Button</fay-Button
    >
    <p style="margin-top: 15px" />
    <fay-Button type="success" loading @click="handleTest"
      >medium Button</fay-Button
    >

    <p style="margin-top: 15px" />
    <fay-Button type="success" size="large" @click="handleTest"
      >large Button</fay-Button
    >
    <p style="margin-top: 15px" />
    <fay-Button type="success" disabled size="large" @click="handleTest">
      <div>哈哈哈</div>
    </fay-Button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {},
  methods: {
    handleTest(e) {
      console.log(e)
    },
  },
  name: 'Home',
}
</script>
