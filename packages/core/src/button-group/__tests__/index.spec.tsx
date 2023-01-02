import { mount } from '@vue/test-utils'
import { ButtonGroup } from '..'
import { Button } from '../../button'

describe('ButtonGroup', () => {
  it('render normal', () => {
    const wrapper = mount({
      render() {
        return (
          <ButtonGroup>
            <Button>Action</Button>
            <Button>Action</Button>
            <Button>Action</Button>
          </ButtonGroup>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('vertical', () => {
    const wrapper = mount({
      render() {
        return (
          <ButtonGroup vertical>
            <Button>Action</Button>
            <Button>Action</Button>
            <Button>Action</Button>
          </ButtonGroup>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('ghost', () => {
    const wrapper = mount({
      render() {
        return (
          <ButtonGroup ghost>
            <Button>Action</Button>
            <Button>Action</Button>
            <Button>Action</Button>
          </ButtonGroup>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('disabled', () => {
    const wrapper = mount({
      render() {
        return (
          <ButtonGroup disabled>
            <Button>Action</Button>
            <Button>Action</Button>
            <Button>Action</Button>
          </ButtonGroup>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('type', () => {
    const wrapper = mount({
      render() {
        return (
          <ButtonGroup type="success">
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
