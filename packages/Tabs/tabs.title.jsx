import { defineComponent, computed } from 'vue'

const TabsTitle = defineComponent({
  props: {
    title: String,
    value: {
      type: [String, Number],
    },
    active: [String, Number],
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handlerClick = (title, value) => emit('click', { title, value })

    const isActive = computed(() => props.value === props.active)

    return () => (
      <>
        <div
          role="tab"
          className={`fect-tab_title ${isActive.value ? 'active' : ''}`}
          onClick={() => handlerClick(props.title, props.value)}
        >
          {props.title}
        </div>
      </>
    )
  },
})

export default TabsTitle
