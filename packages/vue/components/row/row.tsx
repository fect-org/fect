import { computed, PropType, CSSProperties, defineComponent } from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { createName, JustifyTypes, AlignTypes } from '../utils'
import './index.less'

const name = createName('Row')

export const READONLY_LAYOUT_KEY = 'layoutKey'

export type RowProvide = {
  gutter: string | number
}

export default defineComponent({
  name,
  props: {
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'div'
    },
    gutter: {
      type: [String, Number],
      default: 0
    },
    justify: {
      type: String as PropType<JustifyTypes>,
      default: 'start'
    },
    align: {
      type: String as PropType<AlignTypes>,
      default: 'top'
    }
  },
  setup(props, { slots }) {
    const { provider } = createProvider(READONLY_LAYOUT_KEY)
    provider({ gutter: props.gutter })

    const setClass = computed(() => {
      let _class = ''
      if (props.justify !== 'start') {
        _class += ` fect-justify--${props.justify}`
      }
      if (props.align !== 'top') {
        _class += ` fect-align--${props.align}`
      }
      return _class.trim()
    })

    const setStyle = computed(() => {
      const style: CSSProperties = {}
      if (props.gutter) {
        style.marginLeft = `-${Number(props.gutter) / 2}px`
        style.marginRight = style.marginLeft
      }
      return style
    })

    return () => {
      const { tag } = props
      return (
        <tag class={`fect-row ${setClass.value}`} style={setStyle.value}>
          {slots.default?.()}
        </tag>
      )
    }
  }
})
