import { computed, ref, PropType, watch, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { useRealShape, createName, createBem } from '../utils'
import { useCollapseContext } from '../collapse-group/collapse-context'
import CollapseIcon from './collapse-icon'
import './index.less'

const name = createName('Collapse')
const bem = createBem('fect-collapse')

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
    const { context, idx } = useCollapseContext()

    const expandRef = ref<HTMLDivElement>()

    const [height, setHeight] = useState<Height>(props.visible ? 'auto' : 0)

    const clickHandler = () => {
      if (context) return context.updateCollapseGroupChecked(idx)
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
      <div class={bem(null, { shadow: props.shadow })}>
        <div class={bem('view')} role="collapseButton" onClick={clickHandler}>
          <div class="title">
            <h3>{props.title}</h3>
            <CollapseIcon active={visible.value} />
          </div>
          {props.subtitle && (
            <div class="subtitle">{props.subTag ? <props.subTag>{props.subtitle}</props.subTag> : props.subtitle}</div>
          )}
        </div>

        <div
          class={bem('expand')}
          style={{
            visibility: visible.value ? 'visible' : 'hidden',
            height: height.value
          }}
        >
          <div class={bem('content')} ref={expandRef}>
            {slots.default?.()}
          </div>
        </div>
      </div>
    )
  }
})
