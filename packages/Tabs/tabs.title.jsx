import { defineComponent } from 'vue'

const TabsTitle = defineComponent({
  props: {
    title: String,
    value: {
      type: [String, Number],
    },
  },
  setup(props) {
    return () => (
      <>
        <div role="tab" className={'fect-tab_title'}>
          {props.title}
        </div>
      </>
    )
  },
})

export default TabsTitle
