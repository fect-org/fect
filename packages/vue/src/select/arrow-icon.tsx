import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <div>
        <svg
          viewBox="0 0 24 24"
          height="20"
          width="20"
          stroke-width="1"
          stroke-linecap="round"
          color="currentColor"
          stroke="currentColor"
          stroke-linejoin="round"
          fill="none"
          shape-rendering="geometricPrecision"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    )
  }
})
