import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <div>
        <svg
          height="15"
          width="15"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          shape-rendering="geometricPrecision"
          color="currentColor"
        >
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </div>
    )
  }
})
