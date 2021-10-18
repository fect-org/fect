import { mount, flushPromises } from '@vue/test-utils'
import Collapse from '../index'
import CollapseGroup from '../../collapse-group'
import { later } from '../../../tests'

describe('Collapse', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'test',
      },
    })
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be support title and subtitle', () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'HTML',
        subtitle: 'HyperText Markup Language',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('h3').text()).toBe('HTML')
    expect(wrapper.find('.subtitle').text()).toBe('HyperText Markup Language')
  })
  it('should be support subTag and shadow mode', () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'HTML',
        subtitle: 'HyperText Markup Language',
        subTag: 'code',
        shadow: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('code')).toBeTruthy()
    expect(wrapper.find('.fect-collapse--shadow')).toBeTruthy()
  })

  it('should be tigger click', async () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'HTML',
        visible: false,
      },
    })

    await wrapper.find('.fect-collapse__view').trigger('click')
    expect(wrapper.find('.fect-collapse__expand').attributes('style')).toBe('visibility: hidden; height: 0px;')
  })
  it('should be support accordion model', async () => {
    const wrapper = mount({
      components: {
        [Collapse.name]: Collapse,
        [CollapseGroup.name]: CollapseGroup,
      },
      data() {
        return { show: [0], accordion: true }
      },
      template: `
      <div class="container">
        <fe-collapseGroup v-model="show" :accordion="accordion">
          <fe-collapse title="Test">
            123456
          </fe-collapse>
          <fe-collapse title="Test1">
            1
          </fe-collapse>
        </fe-collapseGroup>
      </div>
      `,
    })
    expect(wrapper.html()).toMatchSnapshot()
    const els = wrapper.findAll('.fect-collapse__view')
    await els[0].trigger('click')
    await flushPromises()
    await later()
    expect(wrapper.vm.show.length).toBe(0)
    await els[0].trigger('click')
    await flushPromises()
    await later()
    await els[1].trigger('click')
    expect(wrapper.vm.show).toEqual([1])
    await wrapper.setData({ accordion: false })
    await els[0].trigger('click')
    expect(wrapper.vm.show).toEqual([1, 0])
  })
})
