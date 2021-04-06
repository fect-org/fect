import { defineComponent } from 'vue'

const SideBar = defineComponent({
  setup(props, { slots }) {
    return () => (
      <div className="f_doc-side">
        {new Array(100).fill(0).map((item, i) => (
          <div>1</div>
        ))}
      </div>
    )
  },
})

export default SideBar
