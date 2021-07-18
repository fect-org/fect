import {
  computed,
  onMounted,
  ref,
  Ref,
  unref,
  watch,
  CSSProperties,
  PropType,
} from 'vue'
import { createNameSpace, useRect } from '../utils'
import CollapseIcon from './collapse-icon'
import './index.less'

const [createComponent] = createNameSpace('Collapse')

const getRealShape = (el: Element | Ref<Element | undefined>) => {
  const element = unref(el) as Element
  const rect = useRect(element)
  const { width, height } = window.getComputedStyle(element)

  const getStyleVal = (str: string, parentNum: number) => {
    if (!str) return 0
    const strVal = str.includes('px')
      ? +str.split('px')[0]
      : str.includes('%')
        ? +str.split('%')[0] * parentNum * 0.01
        : str

    return Number.isNaN(+strVal) ? 0 : +strVal
  }
  return {
    width: getStyleVal(`${width}`, rect.width),
    height: getStyleVal(`${height}`, rect.height),
  }
}

export default createComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
    subTag: String as PropType<keyof HTMLElementTagNameMap>,
    visible: Boolean,
    shadow: Boolean,
  },
  emits: ['update:visible'],
  setup(props, { slots, emit }) {
    if (process.env.NODE_ENV !== 'production' && !props.title) {
      console.error('[Fect] title must be in <Collapse>.')
    }

    console.log(props.subTag)

    const ContentRef = ref<HTMLDivElement>()

    const contentWidth = ref<number>(0)
    const contentHeight = ref<number>(0)

    const expand = ref<boolean>(false)

    const setCollapseClass = computed(() => {
      if (props.shadow) return 'fect-collapse--shadow'
      return 'fect-collapse'
    })

    const setExpandStyle = computed(() => {
      const style: CSSProperties = {
        visibility: props.visible ? 'visible' : 'hidden',
        height: props.visible ? 'auto' : 0,
        transition: 'height 200ms ease',
      }
      return style
    })

    const setContentClass = computed(() => {
      if (props.visible) return 'fect-collapse__content--expand'
      return 'fect-collapse__content'
    })

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
          {props.subtitle && (
            <div class="subtitle">
              {props.subTag ? (
                <props.subTag>{props.subtitle}</props.subTag>
              ) : (
                props.subtitle
              )}
            </div>
          )}
        </div>
        <div
          class={setContentClass.value}
          // ref={ContentRef}
          style={setExpandStyle.value}
        >
          <div>{slots.default?.()}</div>
        </div>
      </div>
    )
  },
})
