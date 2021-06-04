import { mount } from '@vue/test-utils'
import BadgeAnchor from '../index'
import Badge from '../../Badge'
import { PlaceTypes } from '../../utils/theme/propTypes'

describe('BadgeAnchor', () => {
  it('should be render as element', () => {
    const badgeAnchor = mount(<BadgeAnchor />)
    expect(() => badgeAnchor.unmount()).not.toThrow()
  })

  it('should be support placement', () => {
    const wrapper = mount({
      setup() {
        return { places: ['topRight', 'topLeft', 'bottomRight', 'bottomLeft'] }
      },
      render() {
        return (
          <>
            {this.places.map((place) => (
              <BadgeAnchor placement={place as PlaceTypes} key={place}>
                <p>Test Info</p>
                <Badge dot />
              </BadgeAnchor>
            ))}
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    const els = wrapper.findAll('sup')
    expect(els[0].attributes('style')).toBe(
      'position: absolute; top: 0px; right: 0px; transform: translate(50%, -50%); transform-origin: 100% 0%; z-index: 1;',
    )
  })
})
