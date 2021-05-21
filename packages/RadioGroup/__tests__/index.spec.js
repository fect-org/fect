import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import RadioGroup from '../index'
import Radio from '../../Radio'

describe('RadioGroup', () => {
  it('should be render as element', () => {
    const radioGroup = mount(RadioGroup)
    expect(radioGroup.html()).toMatchSnapshot()
    expect(() => radioGroup.unmount()).not.toThrow()
  })

  it('should be support initialValue', () => {
    const wrapper = mount(
      <RadioGroup initialValue={1}>
        <Radio value={1}></Radio>
        <Radio value={2}></Radio>
      </RadioGroup>,
    )

    expect(wrapper.html()).toMatchSnapshot()
    const els = wrapper.findAll('.fect-radio-point')
    expect(els[0].classes('active')).toBeTruthy()
  })

  it('should be support useRow', () => {
    const wrapper = mount(<RadioGroup useRow={true}></RadioGroup>)
    expect(wrapper.find('.fect-radio-group').classes('useRow')).toBe(true)
  })

  it('should be support disabled', () => {
    const wrapper = mount(
      <RadioGroup disabled={true}>
        <Radio value={1} />
        <Radio value={2} />
      </RadioGroup>,
    )

    const labels = wrapper.findAll('label')
    expect(labels[0].classes('disabled')).toBeTruthy()
    expect(labels[1].classes('disabled')).toBeTruthy()
  })

  it('should be support differentSizes', () => {
    const wrapper = mount({
      setup() {
        return { sizeList: ['mini', 'small', 'medium', 'large'] }
      },
      render(h) {
        return (
          <>
            {this.sizeList.map((item) => (
              <RadioGroup size={item} key={item}>
                <Radio value={item} />
              </RadioGroup>
            ))}
          </>
        )
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be support emit change', async () => {
    const wrapper = mount({
      emits: ['change'],
      setup(props, { emit }) {
        const test = ref(0)
        const handlerChange = (next) => {
          test.value = next
          emit('change', next)
        }
        return {
          test,
          handlerChange,
        }
      },
      render() {
        return (
          <>
            <RadioGroup onChange={this.handlerChange}>
              <Radio value={1} />
              <Radio value={2} />
            </RadioGroup>
          </>
        )
      },
    })

    const labels = wrapper.findAll('[type="radio"]')
    await labels[0].trigger('change')
    expect(wrapper.vm.test).toEqual(1)
    expect(wrapper.emitted().change[0]).toEqual([1])
    await labels[1].trigger('change')
    expect(wrapper.vm.test).toEqual(2)
    // expect(wrapper.emitted().change[2]).toEqual([2])
  })
})
