# @fect-ui/scale

Scale your component with minial intrusion.

```tsx
import { defineComponent } from 'vue'
import { useScale, CONSTANTS, withScale } from '@fect-ui/scale'
//

const Button = defineComponent({
  props: {
    type: String
  },
  setup(props, { slots }) {
    const { SCALE } = useScale()
    return () => <button>{slots.default?.()}</button>
  }
})

const ScaleButton = withScale(Button)


() => <ScaleButton pr="3" mr="9" type="success">Button</ScaleButton>

```
