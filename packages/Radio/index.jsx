import { computed, onMounted, ref, toRefs } from 'vue'
import { createNameSpace, theme, validator } from '../utils'

const { normalSizes } = theme

const [createComponent] = createNameSpace('Radio')
import './radio.less'

export default createComponent({
  props: {
    checked: Boolean,
    value: { type: String, default: '11' },
    size: {
      type: String,
      validator: validator.enums(normalSizes),
      default: 'medium',
    },
  },
  emtis: ['change'],
  setup(props, { attrs, slots, emit }) {
    const { checked, value, size } = toRefs(props)
    const selfChecked = ref(!!checked.value)
    console.log(selfChecked)
    const handlerChange = (e) => {
      emit('change', e)
    }

    //size =>12px 14px 16px 18px

    return () => (
      <div className={`fay-radio ${attrs?.class ? attrs.class : ''}`}>
        <label>
          <input
            {...attrs}
            type="radio"
            checked={selfChecked.value}
            onChange={handlerChange}
          ></input>
          <span className={'.fay-radio-name'}>
            {slots.default?.()}
            <span className={'.fay-radio-point'}></span>
          </span>
        
        </label>
      </div>
    )
  },
})
