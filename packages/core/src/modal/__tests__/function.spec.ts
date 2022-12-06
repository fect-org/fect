import { createApp } from 'vue'
import { later, trigger } from '../../../tests'
import { Modal } from '../function-call'
import ModalComponent from '../modal'

describe('Modal', () => {
  it('should be use work correctly', async () => {
    const closeFn = jest.fn()
    const confirmFn = jest.fn()
    Modal({
      title: 'test',
      content: 'test message',
      close: closeFn,
      confirm: confirmFn
    })
    await later()
    const btns = document.querySelectorAll('.fect-modal__button')
    expect(document.querySelector('.fect-modal__wrapper')).toBeTruthy()
    await trigger('click', btns[0])
    expect(closeFn).toHaveBeenCalled()
    Modal({
      title: 'test',
      content: 'test message',
      close: closeFn,
      confirm: confirmFn
    })
    await trigger('click', btns[1])
    expect(confirmFn).toHaveBeenCalled()
  })

  it('should register component in to app', async () => {
    const app = createApp(document.body)
    app.use(Modal)
    expect(app.component(ModalComponent.name)).toBeTruthy()
  })
})
