<template>
  <div>
    <github />
    <fe-spacer inline />
    <gitlab />
  </div>
</template>

<script>
import { github, gitlab } from '@fect-ui/vue-icons'
export default {
  name: 'ex-icons-default',
  components: {
    github,
    gitlab,
  },
}
</script>
