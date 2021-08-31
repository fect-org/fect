import { mount } from '@vue/test-utils'
import Breadcrumbs from '../index'
import BreadcrumbsItem from '../../breadcrumbs-item'

const BreadcrumbsTest = {
  template: '<Breadcrumbs />',
}

const DiffWrapper = {
  components: {
    [Breadcrumbs.name]: Breadcrumbs,
    [BreadcrumbsItem.name]: BreadcrumbsItem,
  },
  data () {
    return {
      sizes: ['mini', 'small', 'medium', 'large'],
    }
  },
  template: `
    <fe-breadcrumbs v-for="(size, idx) in sizes" :size="size" :key="idx">
      {{idx}}
    </fe-breadcrumbs>`,
}

const Wrapper = {
  components: {
    [Breadcrumbs.name]: Breadcrumbs,
    [BreadcrumbsItem.name]: BreadcrumbsItem,
  },
<<<<<<< HEAD:packages/breadcrumbs/__tests__/index.spec.ts
  template: `<fe-breadcrumbs separator=">">
    <fe-breadcrumbsItem />
    <fe-breadcrumbsItem />
  </fe-breadcrumbs>`,
=======
  template: `<Breadcrumbs separator=">">
    <BreadcrumbsItem />
    <BreadcrumbsItem />
  </Breadcrumbs>`,
>>>>>>> test(breadcrumbs): update breadcrumbs unit test case with ts:packages/breadcrumbs/__tests__/index.spec.ts
}

describe('Breadcrumbs', () => {
  it('should be render as element', () => {
    const braedcrumbs = mount(BreadcrumbsTest)
    expect(() => braedcrumbs.unmount()).not.toThrow()
  })

  it('should be support different sizes', () => {
    const wrapper = mount(DiffWrapper)

    const els = wrapper.findAll('.fect-breadcrumbs')
    expect(els[0].attributes('style')).toBe('font-size: 12px;')
    expect(els[1].attributes('style')).toBe('font-size: 14px;')
    expect(els[2].attributes('style')).toBe('font-size: 16px;')
    expect(els[3].attributes('style')).toBe('font-size: 18px;')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be support custom separator', () => {
    const wrapper = mount(Wrapper)
    expect(wrapper.find('.fect-breadcrumbs__separator').text()).toBe('>')
  })
})
