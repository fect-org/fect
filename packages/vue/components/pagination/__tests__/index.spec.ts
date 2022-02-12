import { mount } from '@vue/test-utils'
import { Pagination } from '..'

describe('Pagination', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Pagination)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be work error when in edge case', async () => {
    const wrapper = mount(Pagination, {
      props: {
        limit: 2,
        count: 10
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setProps({ count: 0 })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be support simple mode render', () => {
    const wrapper = mount(Pagination, {
      props: {
        simple: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be render all pages when limit value is more than the count value', () => {
    const wrapper = mount(Pagination, {
      props: {
        limit: 11,
        count: 10
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('button').length).toBeGreaterThanOrEqual(12)
  })
  it('should trigger change page number', async () => {
    const wrapper = mount(Pagination, {
      props: {
        modelValue: 1,
        count: 10
      }
    })
    const els = wrapper.findAll('.pagination-item__button ')
    expect(wrapper.vm.modelValue).toEqual(1)
    await els[2].trigger('click')
    expect(wrapper.emitted().change[0]).toEqual([2])
    await els[els.length - 1].trigger('click')
    expect(wrapper.emitted().change[1]).toEqual([3])
    await els[0].trigger('click')
    expect(wrapper.emitted().change[0]).toEqual([2])
  })
  it('should render as custom prev or next', async () => {
    const wrapper = mount({
      components: {
        [Pagination.name]: Pagination
      },
      data: () => ({ value: 1, count: 10, limit: 11, size: 'medium' }),
      template: `<fe-pagination v-model="value" :count="count" 
      :limit="limit" :size="size">
       <template #prev>
        上一页
       </template>
       <template #next>
        下一页
       </template>
      </fe-pagination>`
    })

    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setData({ limit: 7 })
    const els = wrapper.findAll('.pagination-item__button')
    expect(wrapper.html()).toMatchSnapshot()
    await els[els.length - 1].trigger('click')
    expect(wrapper.vm.value).toEqual(2)
    // eslint-disable-next-line prefer-destructuring
    const ellipsisEl = wrapper.findAll('.pagination-item__button ')[7]
    await ellipsisEl.trigger('mouseenter')
    await ellipsisEl.trigger('click')
    await ellipsisEl.trigger('mouseleave')
    expect(wrapper.vm.value).toEqual(7)
  })
})
