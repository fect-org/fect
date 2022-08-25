<template>
  <div>
    <fe-button @click="handleChange">重新加载</fe-button>
    <fe-skeleton :loading="load">
      <template #skeleton>
        <div style="display: inline-flex; width: 100%" v-for="(_, i) in 3" :key="i">
          <fe-skeletonItem variable="circle" style="margin-bottom: 10px" />
          <div style="display: flex; flex-direction: column">
            <fe-skeletonItem variable="h3" style="margin-left: var(--fect-gap-half); width: 60px" />
            <fe-skeletonItem style="margin-left: var(--fect-gap-half); width: 60px" />
          </div>
        </div>
      </template>
      <div v-for="(_, i) in 3" :key="i" style="margin-top: 10px">
        <test-user />
      </div>
    </fe-skeleton>
  </div>
</template>

<script>
import { ref } from 'vue'
import User from './user.vue'
export default {
  name: 'ExSkeletonMore',
  components: {
    [User.name]: User
  },
  setup() {
    const load = ref(false)
    const handleChange = () => {
      load.value = false
      setTimeout(() => (load.value = true), 2000)
    }
    return {
      load,
      handleChange
    }
  }
}
</script>
