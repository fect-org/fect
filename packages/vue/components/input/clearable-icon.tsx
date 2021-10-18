import { defineComponent, computed } from 'vue'

const ClearableIcon = defineComponent({
  props: {
    visible: Boolean,
    disabled: Boolean,
  },
  emits: ['click'],
  setup(props, { emit }) {
    const clearableStyle = computed(() => {
      let str = ''
      props.visible && (str += ' visible')
      props.disabled && (str += ' disabled')
      return str
    })

    const handleClick = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      emit('click', e)
    }

    return () => (
      <div class={`fect-input__clear-icon ${clearableStyle.value}`} onClick={handleClick}>
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
      </div>
    )
  },
})

export default ClearableIcon
