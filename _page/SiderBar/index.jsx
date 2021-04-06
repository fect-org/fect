import { defineComponent } from 'vue'
import Widgets from './widgets'

const SideBar = defineComponent({
  setup(props, { slots }) {
    return () => (
      <div className="f_doc-side">
        <Widgets />
        {new Array(100).fill(0).map((item, i) => (
          <div>{i}</div>
        ))}
      </div>
    )
  },
})

export default SideBar
