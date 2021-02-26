<template>
  <div class="home">
    <!-- size="medium" -->
    <fay-Button type="success" size="mini" @click="handleTest"
      >mini Button</fay-Button
    >
    <p style="margin-top: 15px" />
    <fay-Button type="success" size="small" @click="handleTest"
      >small Button</fay-Button
    >
    <p style="margin-top: 15px" />
    <fay-Button type="success" @click="handleTest">medium Button</fay-Button>

    <p style="margin-top: 15px" />
    <fay-Button type="success" size="large" @click="handleTest"
      >large Button</fay-Button
    >
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
