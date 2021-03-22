import { computed, toRefs } from 'vue'
import { createNameSpace } from '../utils'
const [createComponent] = createNameSpace('Capacity')
import './capacity.less'

export default createComponent({
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    limit: {
      type: [Number, String],
      default: 0,
    },
    color: String,
  },
  setup(props, { attrs }) {
    const { value, limit, color } = toRefs(props)
    const calcColor = computed(() => {
      if (color?.value) {
        return color.value
      }
      const val = value.value
      if (val < 33) return 'var(--hightlight-cyan)'
      if (val < 66) return 'var(--warning-light)'
      return 'var(--error-dark)'
    })

    return () => (
      <>
        <div
          {...attrs}
          title={`${value.value}%`}
          className={`fect-capacity ${attrs.class ? attrs.class : ''}`}
        >
          <span
            style={{
              backgroundColor: calcColor.value,
              width: `${value.value}%`,
            }}
          ></span>
        </div>
      </>
    )
  },
})
