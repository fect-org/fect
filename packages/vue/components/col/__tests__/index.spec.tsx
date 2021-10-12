import { mount } from '@vue/test-utils'
import Col from '../index'
import Row from '../../row'

describe('Col', () => {
  it('should be render as Element', () => {
    const col = mount(Col)
    expect(col.html()).toMatchSnapshot()
    expect(() => col.unmount()).not.toThrow()
  })

  it('should be support tag', () => {
    const wrapper = mount(Col, {
      props: {
        tag: 'span',
      },
    })
    expect(wrapper.find('span')).toBeTruthy()
  })
  it('should be use row gutter', () => {
    const wrapper = mount({
      render() {
        return (
          <Row gutter={1}>
            <Col />
          </Row>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
