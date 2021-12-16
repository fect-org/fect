<template>
  <div>
    <fe-input placeholder="请输入关键字">
      <template #icon> <Search /> </template>
    </fe-input>
    <fe-spacer :y="0.5" />
    <fe-input placeholder="gayhub">
      <template #icon> <Github /> </template>
    </fe-input>
  </div>
</template>

<script>
import { Search, Github } from '@fect-ui/vue-icons'
export default {
  name: 'ex-input-icon',
  components: { Search, Github }
}
</script>
