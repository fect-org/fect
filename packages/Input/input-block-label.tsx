import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, { slots }) {
    return () => <label>{slots.default?.()}</label>
  },
})
