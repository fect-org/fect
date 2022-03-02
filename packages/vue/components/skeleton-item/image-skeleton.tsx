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
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <path d="M21 15l-5-5L5 21"></path>
      </svg>
    )
  }
})
