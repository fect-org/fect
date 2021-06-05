import { mount } from '@vue/test-utils'
import Link from '../index'

describe('Link', () => {
  it('should be render as element', () => {
    const link = mount(Link)
    expect(link.html()).toMatchSnapshot()
    expect(() => link.unmount()).not.toThrow()
  })

  it('should be render correctly', () => {
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
})
