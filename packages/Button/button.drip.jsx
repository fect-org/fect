import { defineComponent, computed, ref, toRefs } from 'vue'
import './button.drip.less'
//animation default style
const DEFAULT_STYLE = {
  left: '',
  top: '',
  opacity: 0.5,
  transform: 'translate(-50%, -50%)',
}

const ButtonDrip = defineComponent({
  props: {
    x: [String, Number],
    y: [String, Number],
    onCompleted: Function,
  },
  setup(props, { attrs, slots, emit }) {
    const show = ref(false)
    const dripRef = ref(null)
    const { x, y, onCompleted } = toRefs(props)
    const styles = computed(() => {
      const styles = DEFAULT_STYLE
      return styles
    })

    const calcPlace = computed(() => {
      const top = Number.isNaN(+y.value) ? 0 : y.value - 10
      const left = Number.isNaN(+x.value) ? 0 : x.value - 10
      return { top, left }
    })

    return () => (
      <div
        ref={dripRef}
        className={'fay-button-drip'}
        style={styles.value}
        v-show={show.value}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" style={calcPlace.value}>
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g>
              <rect width="100%" height="100%" rx="10" />
            </g>
          </g>
        </svg>
      </div>
    )
  },
})

export default ButtonDrip
