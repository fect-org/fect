<template>
  <div>
    <Github />
    <fe-spacer inline />
    <Gitlab />
  </div>
</template>

<script>
import { Github, Gitlab } from '@fect-ui/vue-icons'
export default {
  name: 'ex-icons-default',
  components: {
    Github,
    Gitlab
  }
}
</script>
