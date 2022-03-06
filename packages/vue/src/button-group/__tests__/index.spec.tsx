import { mount } from '@vue/test-utils'
import { ButtonGroup } from '..'
import { Button } from '../../button'

describe('ButtonGroup', () => {
  it('should render correctly', () => {
    const wrapper = mount({
      render() {
        return (
          <ButtonGroup size="mini">
            <Button>Action</Button>
            <Button>Action</Button>
            <Button>Action</Button>
          </ButtonGroup>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should support render vertical', () => {
    const wrapper = mount({
      render() {
        return (
          <ButtonGroup size="mini" vertical>
            <Button>Action</Button>
            <Button>Action</Button>
            <Button>Action</Button>
          </ButtonGroup>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
