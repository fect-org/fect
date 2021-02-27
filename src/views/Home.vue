<template>
  <div>
    111
    <!-- y="3" -->
    <div style="background: #444">
      <fay-spacer y=".3" x="2" inline />
      1
      <fay-spacer y=".3" x="2" inline />
      1
    </div>
    222
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
