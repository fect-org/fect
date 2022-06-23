<template>
  <div>
    <div v-for="(ex, idx) in types" :key="idx">
      <fe-snippet text="yarn add @fect-ui/vue" width="300px" :copy="ex" />
      <fe-spacer />
    </div>
    <fe-spacer />
    <fe-snippet :text="['cd project', 'now']" width="300px" />
  </div>
</template>

<script>
export default {
  name: 'ExSnippetCopy',
  setup() {
    return {
      types: ['default', 'silent', 'prevent']
    }
  }
}
</script>
