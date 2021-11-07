import Grid from '../../grid'
import GridGroup from '../index'
import { mount } from '@vue/test-utils'

describe('Grid', () => {
  it('shoud be render as element', () => {
    const wrapper = mount({
      render() {
        return (
          <GridGroup>
            <Grid>T</Grid>
          </GridGroup>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be support breakPoints', () => {
    const wrapper = mount({
      render() {
        return (
          <GridGroup>
            <Grid xs={1} sm={2} md={3} lg={4} xl={5}>
              T
            </Grid>
          </GridGroup>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be support align', () => {
    const wrapper = mount({
      render() {
        return (
          <GridGroup>
            <Grid justify="flex-end" xl={3}>
              T
            </Grid>
          </GridGroup>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be supprot use col and count', () => {
    const slots = {
      grid: () => <div>123</div>,
    }
    const wrapper = mount({
      render() {
        return <GridGroup col={4} count={11} v-slots={slots}></GridGroup>
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('props count may be as array', () => {
    const slots = {
      grid: () => <div>123</div>,
    }
    const wrapper = mount({
      render() {
        return <GridGroup col={25} count={[1, 2, 3, 4]} v-slots={slots}></GridGroup>
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
