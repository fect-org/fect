import { computed, ref, PropType, watch } from 'vue'
import { createNameSpace, useRealShape } from '../utils'
import CollapseIcon from './collapse-icon'
import './index.less'

const [createComponent] = createNameSpace('Collapse')

type Shape = {
  width: number
  height: number
}

export default createComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: String,
    subTag: String as PropType<keyof HTMLElementTagNameMap>,
    visible: Boolean,
    shadow: Boolean,
  },
  emits: ['update:visible'],
  setup(props, { slots, emit }) {
    // if (process.env.NODE_ENV !== 'production' && !props.title) {
    //   console.error('[Fect] title must be in <Collapse>.')
    // }

    const expandRef = ref<HTMLDivElement>()

    const height = ref<string | number>(props.visible ? 'auto' : 0)

    const setHeight = (val: string | number) => (height.value = val)

    const setCollapseClass = computed(() => {
      if (props.shadow) return 'fect-collapse--shadow'
      return 'fect-collapse'
    })

    const clickHandler = () => {
      emit('update:visible', !props.visible)
    }

    /**
     * visible attrs will control the expand element height value
     *
     * in first time will set child height value , and if visible as
     * true will set auto . as down
     * and in false will set zero as up
     *
     */

    watch(
      () => props.visible,
      (pre) => {
        const shape = useRealShape(expandRef) as Shape
        if (pre) {
          const entryTimer = setTimeout(() => {
            setHeight(`${shape.height}px`)
            clearTimeout(entryTimer)
          }, 200 / 30)
        } else {
          setHeight(`${shape.height}px`)
          const leaveTimer = setTimeout(() => {
            setHeight(0)
            clearTimeout(leaveTimer)
          }, 200 / 30)
        }
      },
    )

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
          class="fect-collapse__expand"
          style={{
            visibility: props.visible ? 'visible' : 'hidden',
            height: height.value,
          }}
        >
          <div class="fect-collapse__content" ref={expandRef}>
            {slots.default?.()}
          </div>
        </div>
      </div>
    )
  },
})
