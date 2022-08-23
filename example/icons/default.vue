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
  name: 'ExIconsDefault',
  components: {
    Github,
    Gitlab
  }
}
</script>
