import { ref, watch, defineComponent, watchEffect, computed } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../composables'
import { createName, createBem, getDomRect } from '../utils'
import { useMounted } from '../composables'
import { useCollapseContext } from '../collapse-group/collapse-context'
import CollapseIcon from './collapse-icon'

import type { PropType } from 'vue'

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
    const { SCALES } = useScale()
    const { theme } = useTheme()

    const expandRef = ref<HTMLDivElement>()

    const [height, setHeight] = useState<Height>(props.visible ? 'auto' : 0)
    const [visible, setVisible] = useState<boolean>(props.visible)

    const clickHandler = () => {
      if (context) return context.updateCollapseGroupChecked(idx)
      setVisible((pre) => !pre)
    }

    const baseStyle = computed(() => {
      const { palette, layout, expressiveness } = theme.value
      return {
        '--collapse-border': palette.border,
        '--collapse-shadow': expressiveness.shadowSmall,
        '--collapse-radius': layout.radius,
        '--collapse-shadow-padding': layout.gap,
        '--collapse-title-color': palette.foreground,
        '--collapse-sub-title-color': palette.accents_5
      }
    })

    const setCssVariables = computed(() => {
      return {
        ...baseStyle.value,
        '--collapse-font-size': SCALES.font(1),
        '--collapse-width': SCALES.width(1, 'auto'),
        '--collapse-height': SCALES.height(1, 'auto'),
        '--collapse-pt': SCALES.pt(1.2),
        '--collapse-pr': SCALES.pr(0),
        '--collapse-pb': SCALES.pb(1.2),
        '--collapse-pl': SCALES.pl(0),
        '--collapse-mt': SCALES.mt(0),
        '--collapse-mr': SCALES.mr(0),
        '--collapse-mb': SCALES.mb(0),
        '--collapse-ml': SCALES.ml(0),
        '--collapse-content-pt': SCALES.pt(1.2),
        '--collapse-content-pr': SCALES.pr(0),
        '--collapse-content-pb': SCALES.pb(1.2),
        '--collapse-content-pl': SCALES.pl(0)
      }
    })

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
      <div class={bem(null, { shadow: props.shadow })} style={setCssVariables.value}>
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
