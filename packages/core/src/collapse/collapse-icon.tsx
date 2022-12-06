import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    active: Boolean
  },
  setup(props) {
    return () => (
      <svg
        class={`fect-collapse__svg${props.active ? '--active' : ''}`}
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
        shape-rendering="geometricPrecision"
        style={{ color: 'currentColor' }}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    )
  }
})
