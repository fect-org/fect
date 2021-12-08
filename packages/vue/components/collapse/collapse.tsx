import { computed, ref, PropType, watch, defineComponent } from 'vue'
import { useRealShape, createName } from '../utils'
import { useProvider, useState } from '@fect-ui/vue-hooks'
import CollapseIcon from './collapse-icon'
import { READONLY_COLLAPSE_KEY, CollapseProvide } from '../collapse-group/collapse-group'
import './index.less'

const name = createName('Collapse')

type Shape = {
  width: number
  height: number
}

type Height = string | number

export default defineComponent({
  name,
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: String,
    subTag: String as PropType<keyof HTMLElementTagNameMap>,
    visible: Boolean,
    shadow: Boolean
  },
  emits: ['update:visible'],
  setup(props, { slots, emit }) {
    // if (process.env.NODE_ENV !== 'production' && !props.title) {
    //   console.error('[Fect] title must be in <Collapse>.')
    // }

    const { context, idx } = useProvider<CollapseProvide>(READONLY_COLLAPSE_KEY)

    const expandRef = ref<HTMLDivElement>()

    const [height, setHeight] = useState<Height>(props.visible ? 'auto' : 0)

    const setCollapseClass = computed(() => {
      if (props.shadow) return 'fect-collapse--shadow'
      return 'fect-collapse'
    })

    const clickHandler = () => {
      if (context) return context.setCurrentChecked(idx)
      emit('update:visible', !props.visible)
    }

    const visible = computed(() => {
      if (context) {
        const valueArr = context!.checked.value
        const visible = valueArr.indexOf(idx) !== -1
        setHeight(visible ? 'auto' : 0)
        return visible
      }
      return props.visible
    })

    /**
     * visible attrs will control the expand element height value
     *
     * in first time will set child height value , and if visible as
     * true will set auto . as down
     * and in false will set zero as up
     *
     */

    watch(visible, (pre) => {
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
    })

    return () => (
      <div class={setCollapseClass.value}>
        <div class="fect-collapse__view" role="collapseButton" onClick={clickHandler}>
          <div class="title">
            <h3>{props.title}</h3>
            <CollapseIcon active={visible.value} />
          </div>
          {props.subtitle && (
            <div class="subtitle">{props.subTag ? <props.subTag>{props.subtitle}</props.subTag> : props.subtitle}</div>
          )}
        </div>

        <div
          class="fect-collapse__expand"
          style={{
            visibility: visible.value ? 'visible' : 'hidden',
            height: height.value
          }}
        >
          <div class="fect-collapse__content" ref={expandRef}>
            {slots.default?.()}
          </div>
        </div>
      </div>
    )
  }
})
