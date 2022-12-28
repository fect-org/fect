import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    color: String
  },
  emits: ['completed'],
  setup(props, { emit }) {
    return () => {
      const { color, x, y } = props
      const top = Number.isNaN(+y) ? 0 : y - 10
      const left = Number.isNaN(+x) ? 0 : x - 10
      return (
        <div class="fect-button__drip" onAnimationend={() => emit('completed')}>
          <svg width="20" height="20" viewBox="0 0 20 20" style={{ top, left }}>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g fill={color}>
                <rect width="100%" height="100%" rx="10" />
              </g>
            </g>
          </svg>
        </div>
      )
    }
  }
})
