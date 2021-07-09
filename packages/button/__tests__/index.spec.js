import { mount } from '@vue/test-utils'
import Button from '../index'
import { ref } from 'vue'

describe('Button', () => {
  it('should be render as Element', () => {
    const button = mount(Button)
    expect(button.html()).toMatchSnapshot()
  })

  it('should emit click event', () => {
    const wrapper = mount(Button)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    // expect(button.emitted('click').length).toEqual(1)
  })

  it('should no emit click event when status as disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.emitted()).toEqual({})
  })

  it('should no emit click event when sstatus as loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })
    expect(wrapper.emitted()).toEqual({})
  })

  it('should allowed all types', () => {
    const wrapper = mount({
      setup(props) {
        return {
          typeList: ['default', 'success', 'warning', 'error'],
        }
      },
      render(h) {
        return (
          <>
            {this.typeList.map((item, i) => (
              <Button type={item} key={i} />
            ))}
          </>
        )
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should allowed all size', () => {
    const wrapper = mount({
      setup(props) {
        return {
          sizeList: ['mini', 'small', 'medium', 'large'],
        }
      },
      render(h) {
        return (
          <>
            {this.sizeList.map((item, i) => (
              <Button size={item} key={i} />
            ))}
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be support default render', async () => {
    const wrapper = mount({
      setup() {
        const val = ref(0)
        const handlerClick = () => (val.value = 1)
        return { val, handlerClick }
      },
      render() {
        return <Button onClick={this.handlerClick}>{this.val}</Button>
      },
    })

    expect(wrapper.find('.fect-btn').text()).toBe('0')
    await wrapper.find('.fect-btn').trigger('click')
    expect(wrapper.find('.fect-btn').text()).toBe('1')
  })
})
