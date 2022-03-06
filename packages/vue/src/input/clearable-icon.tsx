import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    visible: Boolean,
    disabled: Boolean
  },
  emits: ['click'],
  setup(props) {
    return () => {
      if (props.visible)
        return (
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
            shape-rendering="geometricPrecision"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        )
      return null
    }
  }
})
