import {
  defineComponent,
  computed,
  ref,
  toRefs,
  onMounted,
  watchEffect,
  watch,
} from 'vue'

//animation default style
const DEFAULT_STYLE = {
  left: '',
  top: '',
  opacity: 0.5,
  transform: 'translate(-50%, -50%)',
}

const ButtonDrip = defineComponent({
  props: {
    onCompleted: Function,
  },
  setup(props, { attrs, slots, emit }) {
    const show = ref(false)
    const dripRef = ref(null)
    const { onCompleted } = toRefs(props)
    // onCompleted.value()
    const styles = computed(() => {
      const styles = DEFAULT_STYLE
      return styles
    })
    return () => (
      <>
        <span
          ref={dripRef}
          className={'fay-button-drip'}
          style={styles.value}
          v-show={show.value}
        ></span>
        {/* <style jsx>{`
          .fay-button-drip {
          }
        `}</style> */}
      </>
    )
  },
})

export default ButtonDrip
