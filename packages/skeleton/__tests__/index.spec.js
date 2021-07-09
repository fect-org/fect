import Skeleton from '../index'
import SkeletonItem from '../../skeletonItem'
import { mount } from '@vue/test-utils'

describe('Skeleton', () => {
  it('should be render as a element', () => {
    const wrapper = mount(<Skeleton rows="3" />)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be render three rows in Skeleton', () => {
    const wrapper = mount(<Skeleton rows="3" />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('.fect-skeleton__item').length).toEqual(3)
  })
  it('should be support custom rowsWidth when have not slot', () => {
    const wrapper = mount(<Skeleton rows="3" rowsWidth="[10,80px,70%]" />)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be disabled animated', () => {
    const wrapper = mount(<Skeleton rows="3" animated={false} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.animated').exists()).toBeFalsy()
  })
  it('should be support skeleton slots', () => {
    const slots = {
      skeleton: <SkeletonItem variable="circle" />,
    }
    const wrapper = mount(<Skeleton v-slots={slots} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.circle').exists()).toBeTruthy()
  })
})
