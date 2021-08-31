import { mount } from '@vue/test-utils'
import BadgeAnchor from '..'
import Badge from '../../badge/index'

const Wrapper = {
  components:{
    [BadgeAnchor.name]:BadgeAnchor,
    [Badge.name]:Badge,
  },
  data(){
    return {
      place:'topRight',
      dot:false,
    }
  },
  template:`<div class="container">
   <fe-badgeAnchor :placement="place">
    <p>Test Message</p>
    <fe-badge :dot="dot"/>
   </fe-badgeAnchor>
  </div>`,
}


describe('BadgeAnchor', () =>{
  it('should be render as a context ',async()=>{
    const wrapper = mount(Wrapper)
    const el = wrapper.find('sup')
    expect(el.attributes('style')).toBe(
      'position: absolute; top: 0px; right: 0px; transform: translate(50%, -50%); transform-origin: 100% 0%; z-index: 1;',
    )
    await wrapper.setData({ dot:true })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
