import Card from '../index'
import { mount } from '@vue/test-utils'

describe('Card', () => {
  it('should be render as element', () => {
    const card = mount(Card)

    expect(card.html()).toMatchSnapshot()
  })

  it('should be support shdow and hoverable', () => {
    const wrapper = mount({
      setup() {},
      render(h) {
        return (
          <>
            <Card hoverable>hoverable Card</Card>
            <Card shadow>shadow Card</Card>
            <Card>hoverable and shadow Card</Card>
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
