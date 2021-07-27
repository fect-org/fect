import { mount } from '@vue/test-utils'
import Grid from '../'

describe('Grid', () => {
  it('shoud be render as element', () => {
    const wrapper = mount({
      render() {
        return (
          <Grid container>
            <Grid>T</Grid>
          </Grid>
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
          <Grid container>
            <Grid xs={1} sm={2} md={3} lg={4} xl={5}>
              T
            </Grid>
          </Grid>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be support align', () => {
    const wrapper = mount({
      render() {
        return (
          <Grid container>
            <Grid justify="flex-end" xl={3}>
              T
            </Grid>
          </Grid>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
