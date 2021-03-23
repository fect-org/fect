import { defineComponent, computed, ref, toRefs, onMounted } from 'vue'
import './button.drip.less'

const ButtonDrip = defineComponent({
  props: {
    x: [String, Number],
    y: [String, Number],
    onCompleted: Function,
  },
  setup(props) {
    const dripRef = ref(null)
    const { x, y, onCompleted } = toRefs(props)

    const calcPlace = computed(() => {
      const top = Number.isNaN(+y.value) ? 0 : y.value - 10
      const left = Number.isNaN(+x.value) ? 0 : x.value - 10
      return { top, left }
    })
    onMounted(() => {
      if (!dripRef.value) return
      dripRef.value.addEventListener('animationend', onCompleted.value())
      dripRef.value.removeEventListener('animationend', onCompleted.value())
    })

    return () => (
      <div ref={dripRef} className={'fect-button-drip'}>
        <svg width="20" height="20" viewBox="0 0 20 20" style={calcPlace.value}>
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g fill="var(--accents-2)">
              <rect width="100%" height="100%" rx="10" />
            </g>
          </g>
        </svg>
      </div>
    )
  },
})

export default ButtonDrip
