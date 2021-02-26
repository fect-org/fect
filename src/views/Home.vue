<template>
  <div class="home">
    <fay-Button size="mini" @click="handleTest">I am angry</fay-Button>
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
