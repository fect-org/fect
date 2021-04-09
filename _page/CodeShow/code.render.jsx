import { defineComponent, resolveComponent } from 'vue'

const codeRender = defineComponent({
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const renderComponent = resolveComponent(props.name)
    return () => <renderComponent />
  },
})

export default codeRender
