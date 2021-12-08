import { defineComponent } from 'vue'

const SelcetClearableIcon = defineComponent({
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      emit('click', e)
    }

    return () => (
      <div class="fect-select__clearIcon" onClick={handleClick}>
        <svg
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

export default SelcetClearableIcon
