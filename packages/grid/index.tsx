import { computed, ref } from 'vue'
import { createNameSpace } from '../utils'
import { CustomCSSProperties } from '../utils/base'
import { sizes } from './type'
import { props } from './props'
import './index.less'

const [createComponent] = createNameSpace('Grid')

type Layout = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const getItemLayout = (
  val: number | boolean,
  key: Layout,
): CustomCSSProperties => {
  const display = val === 0 ? 'none' : 'inherit;'
  if (typeof val === 'number') {
    const width = (100 / 24) * val
    const ratio = width > 100 ? '100%' : width < 0 ? '0' : `${width}%`
    return {
      [`--fect-${key}-grow`]: 0,
      [`--fect-${key}-display`]: display,
      [`--fect-${key}-width`]: `${ratio}`,
      [`--fect-${key}-basis`]: `${ratio}`,
    }
  }
  return {
    [`--fect-${key}-grow`]: 1,
    [`--fect-${key}-display`]: display,
    [`--fect-${key}-width`]: '100%',
    [`--fect-${key}-basis`]: '0',
  }
}

export default createComponent({
  props,
  setup(props, { slots }) {
    const setClass = computed(() => {
      const { container } = props
      const classes = sizes.map((size) => {
        const hasSize = props[size] || typeof props[size] === 'number'
        if (hasSize) {
          return `fect-grid--${size}`
        }
        return ''
      })
      if (container) return ['fect-grid__container', ...classes]
      return ['fect-grid', ...classes]
    })

    const CssFlexProps = computed(() => {
      const { alignItems, alignContent, direction, justify } = props
      return {
        'justify-content': justify,
        'align-content': alignContent,
        'flex-direction': direction,
        'align-items': alignItems,
      } as CustomCSSProperties
    })

    const setStyle = computed(() => {
      const { xs, sm, md, lg, xl, gap, wrap, container } = props

      const layout: { [key in Layout]: CustomCSSProperties } = {
        xs: getItemLayout(xs, 'xs'),
        sm: getItemLayout(sm, 'sm'),
        md: getItemLayout(md, 'md'),
        lg: getItemLayout(lg, 'lg'),
        xl: getItemLayout(xl, 'xl'),
      }
      const styles = sizes.map((size) => {
        const hasSize = props[size] || typeof props[size] === 'number'
        if (hasSize) {
          return layout[size]
        }
        return ''
      })

      const containerStyle: CustomCSSProperties = {
        '--fect-gap-unit': `calc(${gap} * var(--fay-gap-quarter))`,
        'flex-wrap': `${wrap}`,
        'margin': 'calc(-1 * var(--fect-gap-unit))',
        'width': 'calc(100% + var(--fect-gap-unit) * 2)',
      }
      if (container) {
        return [...styles, CssFlexProps.value, containerStyle]
      }
      return [...styles, CssFlexProps.value]
    })

    return () => (
      <div class={setClass.value} style={setStyle.value}>
        {slots.default?.()}
      </div>
    )
  },
})
