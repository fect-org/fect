import { defineComponent, computed, ref, PropType } from 'vue'
import { useEventListener } from '@fect-ui/vue-hooks'

type Completed = () => any

const ButtonDrip = defineComponent({
  props: {
    x: Number,
    y: Number,
    onCompleted: {
      type: Function as PropType<Completed>,
      required: true
    }
  },
  setup(props) {
    const dripRef = ref<HTMLDivElement>()

    const setPlace = computed(() => {
      const top = Number.isNaN(+props.y!) ? 0 : props.y! - 10
      const left = Number.isNaN(+props.x!) ? 0 : props.x! - 10
      return { top, left }
    })

    useEventListener('animationend', props.onCompleted(), { target: dripRef })

    return () => (
      <div ref={dripRef} class="fect-button__drip">
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

export default ButtonDrip
