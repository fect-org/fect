import { defineComponent } from 'vue'

const ClearableIcon = defineComponent({
  props: {
    visibled: Boolean,
    disabled: Boolean,
  },
  emits: ['click'],
  setup(props, { emit }) {
    return () => (
      <div>
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </div>
    )
  },
})
