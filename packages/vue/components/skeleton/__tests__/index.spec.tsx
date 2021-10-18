import Skeleton from '../index'
import SkeletonItem from '../../skeleton-item'
import { Variable } from '../../skeleton-item/type'
import { mount } from '@vue/test-utils'

describe('Skeleton', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Skeleton, {
      props: {
        rows: 3,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render anysome rows and setup width with rowsWidth', async () => {
    const wrapper = mount(Skeleton, {
      props: {
        rows: 3,
        rowsWidth: [10, '80px', '70%'],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setProps({ rowsWidth: '50%' })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should support custom skeleton render', async () => {
    const slots = {
      skeleton: () => <SkeletonItem />,
      default: () => <p>already render</p>,
    }

    const wrapper = mount(Skeleton, {
      slots,
    })
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setProps({
      loading: true,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render different type skeletonItem', () => {
    const types: Variable[] = ['p', 'text', 'h1', 'h3', 'rect', 'circle', 'image', 'button', 'caption']

    const slots = {
      skeleton: () => types.map((type, idx) => <SkeletonItem key={idx} variable={type} />),
    }
    const wrapper = mount(Skeleton, {
      slots,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('SkeletonItem can not render without Skeleton', () => {
    const wrapper = mount(SkeletonItem)
    expect(() => wrapper.get('div')).toThrowError()
  })
})
