import { createNameSpace } from '../utils'

const [createComponent] = createNameSpace('avatarGroup')

export default createComponent({
  setup(props, { attrs, slots, emit }) {
    return () => <div></div>
  },
})
