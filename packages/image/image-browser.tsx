import { defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import Link from '../link'
import { ImageProvide, READONLY_IMAGE_KEY } from './type'
import HttpIcons from './image-browser-icon'

const ImageBrowser = defineComponent({
  setup(props, { attrs, slots }) {
    const { context } = useProvider<ImageProvide>(READONLY_IMAGE_KEY)
    console.log(context)
    const {
      inputBgColor,
      titleColor,
      color,
      borderColor,
      barBgColor,
    } = context!.setColors.value

    const link = context!.showLinkType.value

    const { show, head } = context!.setHead.value

    const renderAddressInput = () => (
      <>
        {(show && (
          <div class="address-input" style={{ backgroundColor: inputBgColor }}>
            <span class="https">
              <HttpIcons />
            </span>
            <Link href={link} {...attrs}>
              {link}
            </Link>
          </div>
        )) || (
          <div class="title" style={{ color: titleColor }}>
            <span>{head}</span>
          </div>
        )}
      </>
    )

    return () => (
      <div class="fect-image__browser">
        <header
          style={{
            color,
            backgroundColor: barBgColor,
            borderBottomColor: borderColor,
          }}
        >
          <div class="traffic">
            <span class="close" role="browser-close" />
            <span class="mini" role="browser-mini" />
            <span class="full" role="browser-full" />
          </div>
          {renderAddressInput()}
        </header>
        {slots.default?.()}
      </div>
    )
  },
})

export default ImageBrowser
