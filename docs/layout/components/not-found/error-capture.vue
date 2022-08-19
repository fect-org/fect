<template>
  <div class="capture">
    <not-found v-if="renderError" :error="renderError" />
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured } from 'vue'
import { useGlobalState } from '../../composables'
import NotFound from './not-found.vue'

export default defineComponent({
  components: { NotFound },
  setup() {
    const { renderError, setRenderError } = useGlobalState()
    onErrorCaptured((err) => {
      setRenderError(err)
      return false
    })
    return {
      renderError
    }
  }
})
</script>
