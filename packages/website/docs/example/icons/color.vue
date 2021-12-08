<template>
  <div>
    <Github color="blue" />
    <fe-spacer inline />
    <Gitlab color="blue" />
  </div>
</template>

<script>
import { Github, Gitlab } from '@fect-ui/vue-icons'
export default {
  name: 'ex-icons-color',
  components: {
    Github,
    Gitlab
  }
}
</script>
