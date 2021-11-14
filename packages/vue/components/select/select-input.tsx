import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    visible: Boolean,
  },
  setup(props) {
    return () => (
      <>
        <input
          class="fect-select__input"
          type="search"
          role="combobox"
          aria-haspopup="listbox"
          readonly
          unselectable="on"
          aria-expanded={props.visible}
        />
      </>
    )
  },
})
