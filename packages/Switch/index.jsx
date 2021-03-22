import { computed, ref, toRefs, watch } from 'vue'
import { validator, theme, createNameSpace } from '../utils'

const [createComponent] = createNameSpace('Switch')
const { normalSizes } = theme

import './switch.less'

export default createComponent({
  props: {
    checked: Boolean,
    size: {
      type: String,
      validator: validator.enums(normalSizes),
      default: 'medium',
    },
    disabled: Boolean,
  },
  emits: ['change'],
  setup(props, { attrs, slots, emit }) {
    const { checked, size, disabled } = toRefs(props)
    const selfChecked = ref(checked.value)
    const changeHandler = (e) => {
      const selfEvent = {
        target: {
          checked: !selfChecked.value,
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e,
      }
      selfChecked.value = !selfChecked.value
      emit('change', selfEvent)
    }
    const calcStatus = computed(() => {
      let str = ''
      selfChecked.value && (str += ' checked')
      disabled.value && (str += ' disabled')
      return str
    })

    return () => (
      <>
        <label
          {...attrs}
          className={`fect-switch ${size.value} ${calcStatus.value}
          ${attrs.class ? attrs.class : ''}`}
        >
          <input
            className={`fect-switch-checkBox ${size.value}`}
            type="checkBox"
            checked={selfChecked.value}
            disabled={disabled.value}
            onChange={changeHandler}
          ></input>
          <div
            className={`fect-swtich-slider ${size.value} ${calcStatus.value}`}
          ></div>
        </label>
      </>
    )
  },
})
