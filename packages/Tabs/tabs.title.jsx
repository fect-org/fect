import { defineComponent, computed } from 'vue'

const TabsTitle = defineComponent({
  props: {
    title: String,
    value: {
      type: [String, Number],
    },
    active: [String, Number],
    disabled: Boolean,
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handlerClick = (title, value, e) => {
      // when tab has disabled attrs,event is not allowed
      if (props.disabled) return
      emit('click', { title, value, e })
    }

    const isActive = computed(() => props.value === props.active)

    const setTitleStatus = computed(() => {
      let str = ''
      props.value === props.active && (str += ' active')
      props.disabled && (str += ' disabled')
      return str
    })

    return () => (
      <>
        <div
          role="tab"
          className={`fect-tab_title ${setTitleStatus.value}`}
          onClick={(e) => handlerClick(props.title, props.value, e)}
        >
          {props.title}
        </div>
      </>
    )
  },
})

export default TabsTitle
