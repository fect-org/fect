import { computed, ref } from 'vue'
import { createNameSpace } from '../utils'
import CollapseIcon from './collapse-icon'
import './index.less'

const [createComponent] = createNameSpace('Collapse')

export default createComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
    visible: Boolean,
    shadow: Boolean,
  },
  emits: ['update:visible'],
  setup(props, { slots, emit }) {
    if (process.env.NODE_ENV !== 'production' && !props.title) {
      console.error('[Fect] title must be in <Collapse>.')
    }

    const ContentRef = ref<HTMLDivElement>()

    const setCollapseClass = computed(() => {
      if (props.shadow) return 'fect-collapse--shadow'
      return 'fect-collapse'
    })

    // const setExpandStyle = computed(() => {})

    const clickHandler = () => {
      emit('update:visible', !props.visible)
    }

    return () => (
      <div class={setCollapseClass.value}>
        <div
          class="fect-collapse__view"
          role="collapseButton"
          onClick={clickHandler}
        >
          <div class="title">
            <h3>{props.title}</h3>
            <CollapseIcon active={props.visible} />
          </div>
          {props.subtitle && <div class="subtitle">{props.subtitle}</div>}
        </div>
        <div
          class="fect-collapse__content"
          v-show={props.visible}
          ref={ContentRef}
        >
          {slots.default?.()}
        </div>
      </div>
    )
  },
})
