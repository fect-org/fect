import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    x: Number,
    y: Number
  },
  emits: ['completed'],
  setup(props, { emit }) {
    const setPlace = computed(() => {
      const top = Number.isNaN(+props.y!) ? 0 : props.y! - 10
      const left = Number.isNaN(+props.x!) ? 0 : props.x! - 10
      return { top, left }
    })

    return () => (
      <div class="fect-button__drip" onAnimationend={() => emit('completed')}>
        <svg width="20" height="20" viewBox="0 0 20 20" style={setPlace.value}>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g fill="var(--accents-2)">
              <rect width="100%" height="100%" rx="10" />
            </g>
          </g>
        </svg>
      </div>
    )
  }
})
