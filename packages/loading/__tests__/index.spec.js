import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Loading from '../index'
describe('Loading', () => {
  it('should be render as element', () => {
    const loading = mount(Loading)
    expect(loading.html()).toMatchSnapshot()
    expect(() => loading.unmount()).not.toThrow()
  })

  it('should be support types', () => {
    const wrapper = mount({
      setup() {
        return { typeList: ['default', 'success', 'warning', 'error'] }
      },
      render() {
        return (
          <>
            {this.typeList.map((item, i) => (
              <Loading type={item} key={i} />
            ))}
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('.fect-loading-container').length).toEqual(4)
  })

  it('should be support different sizes', () => {
    const wrapper = mount({
      setup() {
        return { sizeList: ['mini', 'small', 'medium', 'large'] }
      },
      render() {
        return (
          <>
            {this.sizeList.map((item, i) => (
              <Loading size={item} key={i} />
            ))}
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('.fect-loading-container').length).toEqual(4)
  })

  it('should be support use custom color', () => {
    const wrapper = mount({
      setup() {
        const cusColor = ref('pink')
        return { cusColor }
      },
      render() {
        return (
          <>
            <Loading color={this.cusColor} />
          </>
        )
      },
    })
    const el = wrapper.find('i')
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.vm.cusColor).toEqual('pink')
    expect(el.attributes('style')).toBe('background: pink;')
  })
  it('should be support loadType', () => {
    const cube = mount(Loading, {
      props: {
        loadType: 'cube',
      },
    })
    const wave = mount(Loading, {
      props: {
        loadType: 'wave',
      },
    })
    expect(cube.html()).toMatchSnapshot()
    expect(cube.findAll('.loading__cube')).toBeTruthy()
    expect(wave.html()).toMatchSnapshot()
    expect(wave.findAll('.loading__wave')).toBeTruthy()
  })
})
