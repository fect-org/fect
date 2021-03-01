import { validator, theme, createNameSpace } from '../utils'

const [createComponent] = createNameSpace('Switch')
import './swtich.less'

export default createComponent({
  setup(props, { attrs, slots, emit }) {
    return () => (
      <>
        <label className={'fay-swtich'}>
          <input className={'fay-switch-checkBox'} type={'checkBox'}></input>
          <span className={'fay-swtich-slider'}></span>
        </label>
      </>
    )
  },
})
