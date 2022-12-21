import { computed, defineComponent, PropType } from 'vue'
import { assign, kebabCase, noop } from '@fect-ui/shared'
import { createName } from '../utils'
import type { StyleType } from './interface'

const name = createName('ThemeProvide')

// user may entry null or undefined.
const getStyleVariables = (style: StyleType) =>
  Object.entries(style || {}).reduce((styles, [prop, attr]) => {
    const cssVar = prop.startsWith('--') ? prop : `--${kebabCase(prop)}`
    return assign(styles, { [cssVar]: attr })
  }, {} as StyleType)

export default defineComponent({
  name,
  props: {
    vars: {
      type: Object as PropType<StyleType>,
      default: noop
    }
  },
  setup(props, { slots }) {
    const setStyle = computed(() => getStyleVariables(props.vars))

    return () => (
      <div class="fect-theme__context" style={setStyle.value}>
        {slots.default?.()}
      </div>
    )
  }
})
