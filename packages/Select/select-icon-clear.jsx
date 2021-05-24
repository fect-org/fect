import { defineComponent } from 'vue'

const SelcetClearableIcon = defineComponent({
  setup() {
    return () => (
      <div class="fect-select__clearIcon">
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision"
          style={style.value}
        >
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </div>
    )
  },
})

export default SelcetClearableIcon
