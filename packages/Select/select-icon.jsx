import { defineComponent } from 'vue'

const SelectIcon = defineComponent({
  props: {
    className: String,
  },
  setup(props) {
    return () => (
      <div class={`fect-select__icon-context ${props.className}`}>
        <svg
          viewBox="0 0 24 24"
          width="20px"
          height="20px"
          strokeWidth="1"
          strokeLinecap="round"
          color="currentColor"
          stroke="currentColor"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    )
  },
})

export default SelectIcon
