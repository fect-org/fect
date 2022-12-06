import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        shape-rendering="geometricPrecision"
        viewBox="0 0 24 24"
        height="24"
        width="24"
        style="color: currentcolor;"
      >
        <path d="M12 5v14M5 12h14"></path>
      </svg>
    )
  }
})
