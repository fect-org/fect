<template>
  <div>
    <github color="blue" />
    <fe-spacer inline />
    <gitlab color="blue" />
  </div>
</template>

<script>
import { github, gitlab } from '@fect-ui/vue-icons'
export default {
  name: 'ex-icons-color',
  components: {
    github,
    gitlab,
  },
}
</script>
