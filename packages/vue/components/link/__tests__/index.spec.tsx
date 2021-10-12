import Link from '../index'
import { mount } from '@vue/test-utils'

describe('Link', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Link)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be render correctly', async () => {
    const wrapper = mount({
      render() {
        return (
          <>
            <Link href="https://www.test.com">Link</Link>
            <Link href="https://www.test.com" color>
              Link
            </Link>
            <Link href="https://www.test.com" underline>
              Link
            </Link>
            <Link href="https://www.test.com" color underline>
              Link
            </Link>
            <Link href="https://www.test.com" block>
              Link
            </Link>
          </>
        )
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('props to should higher than props href', async () => {
    const wrapper = mount(Link, {
      props: {
        to: '#',
      },
    })
    const el = wrapper.find('.fect-link')
    await el.trigger('click')
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
