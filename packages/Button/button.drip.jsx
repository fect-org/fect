import { defineComponent, computed, ref } from 'vue'

const ButtonDrip = defineComponent({
  props: {},
  setup(props, { attrs, slots, emit }) {
    const show = ref(false)
    const DEFAULT = {
      left: '',
      top: '',
      opacity: 0.5,
      transform: 'translate(-50%, -50%)',
    }
    const styles = computed(() => {
      const styles = DEFAULT
      return styles
    })
    console.log(show.value)
    return () => (
      <>
        <span
          className={'fay-button-drip'}
          style={styles.value}
          v-show={show.value}
        ></span>
        <style jsx>{`
          .fay-button-drip {
            color: red;
          }
        `}</style>
      </>
    )
  },
})

export default ButtonDrip
