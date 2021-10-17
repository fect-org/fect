import { createApp } from 'vue'
import { later } from '../../../tests'
import { Toast } from '../function-call'
import ToastComponent from '../toast'

describe('Toast', () => {
  it('should be use work correctly', async () => {
    Toast({
      text: 'test',
    })
    await later()
    expect(document.querySelector('.fect-toast__area')).toBeTruthy()
  })

  it('should be support static call func', async () => {
    Toast.success({ text: 'test' })
    expect(document.querySelector('.fect-toast__area')).toBeTruthy()
  })

  // it('should destroy all toast queue after hidden', async () => {
  //   Toast({
  //     text: 'test',
  //   })
  //   await later(5000)
  //   expect(document.querySelector('.fect-toast__container')).toBeFalsy()
  // })

  it('toast queue can not break 11', async () => {
    Array(11)
      .fill(0)
      .map((_, idx) => Toast({ text: idx }))
    await later()
    Toast({ text: 'new data' })
    expect(document.querySelectorAll('.fect-toast__container').length).toBe(11)
  })

  it('should register component in to app', async () => {
    const app = createApp(document.body)
    app.use(Toast)
    expect(app.component(ToastComponent.name)).toBeTruthy()
  })
})
