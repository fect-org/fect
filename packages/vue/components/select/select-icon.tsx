import { defineComponent } from 'vue'

const SelectIcon = defineComponent({
  setup() {
    return () => (
      <div class="fect-select__icon-context">
        <svg
          viewBox="0 0 24 24"
          width="20px"
          height="20px"
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
  },
})

export default SelectIcon
