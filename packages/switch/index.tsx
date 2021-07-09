import { computed, ref, PropType } from 'vue'
import { createNameSpace } from '../utils'
import { NormalSizes } from '../utils/theme/propTypes'
import './index.less'

const [createComponent] = createNameSpace('Switch')

interface SwitchEventTarget {
  checked: boolean
}

export interface SwitchEvent {
  target: SwitchEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: Event
}

export default createComponent({
  props: {
    checked: Boolean,
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
    disabled: Boolean,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const selfChecked = ref<boolean>(props.checked)
    const changeHandler = (e: Event) => {
      const selfEvent: SwitchEvent = {
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

    const setClass = computed(() => {
      const names: string[] = []
      props.size && names.push(props.size)
      props.disabled && names.push('disabled')
      selfChecked.value && names.push('checked')

      return names.join(' ')
    })

    return () => (
      <label class={`fect-switch ${setClass.value}`}>
        <input
          class={`fect-switch-checkBox ${props.size}`}
          type="checkBox"
          checked={selfChecked.value}
          disabled={props.disabled}
          onChange={changeHandler}
        />
        <div class={`fect-swtich-slider ${setClass.value}`}></div>
      </label>
    )
  },
})
