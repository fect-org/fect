import { mount } from '@vue/test-utils'
import Card from '..'

const Wrapper = {
  component: {
    [Card.name]: Card,
  },
  data() {
    return {
      hoverable: false,
      shadow: false,
    }
  },
  template: `
   <div class="container">
    <fe-card>Normalize Card</fe-card>
    <fe-card :hoverable="hoverable">Hoverable Card</fe-card>
    <fe-card :shadow="shadow">Shadow Card</fe-card>
    <fe-card :hoverable="hoverable" :shadow="shadow">Hoverable and Shadow Card</fe-card>
   </div>
  `,
}

describe('Card', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Card)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should support render different state component', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({ hoverable: true, shadow: true })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
