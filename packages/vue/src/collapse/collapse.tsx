import { ref, PropType, watch, defineComponent, watchEffect } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem, getDomRect, useMounted } from '../utils'
import { useCollapseContext } from '../collapse-group/collapse-context'
import CollapseIcon from './collapse-icon'
import './index.less'

const name = createName('Collapse')
const bem = createBem('fect-collapse')

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
    const [visible, setVisible] = useState<boolean>(props.visible)

    const clickHandler = () => {
      if (context) return context.updateCollapseGroupChecked(idx)
      setVisible((pre) => !pre)
    }

    const setVislbeWidthGroupMod = () => {
      if (!context) return
      const parent = context.checked.value
      const exist = parent.indexOf(idx) !== -1
      setVisible(exist)
      setHeight(exist ? 'auto' : 0)
    }

    watchEffect(setVislbeWidthGroupMod)

    let shape: ReturnType<typeof getDomRect> | null

    const setShape = () => {
      if (expandRef.value) {
        if (shape) return
        shape = getDomRect(expandRef)
      }
    }

    useMounted([setShape, () => (shape = null)])

    const setCollapseHiehgt = (state: boolean) => {
      if (!shape) shape = getDomRect(expandRef)
      if (state) {
        const entryTimer = setTimeout(() => {
          setHeight(`${shape!.height}px`)
          clearTimeout(entryTimer)
        }, 200 / 30)
        return
      }
      setHeight(`${shape.height}px`)
      const leaveTimer = setTimeout(() => {
        setHeight(0)
        clearTimeout(leaveTimer)
      }, 200 / 30)
    }

    watch(visible, (cur) => {
      setCollapseHiehgt(cur)
      emit('update:visible', cur)
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
