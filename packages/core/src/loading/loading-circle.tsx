import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <svg class="fect-loading__circle" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" />
      </svg>
    )
  }
})
