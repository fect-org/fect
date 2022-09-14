import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { Toast } from '../function-call'
import { make } from '../../utils'
import { later } from '../../../tests'

describe('Toast', () => {
  it('work correctly', async () => {
    Toast({
      text: 'test'
    })
    await later()
    expect(document.querySelector('.fect-toast')).toBeTruthy()
  })

  it('component', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignored
    const wrapper = mount(Toast.Component)
    expect(() => wrapper.getComponent(Toast.Component.name)).toThrowError()
  })

  it('install component', () => {
    const app = createApp(document.body)
    app.use(Toast)
    expect(app.component(Toast.Component.name)).toBeTruthy()
  })

  it('duration', async () => {
    Toast({
      text: 'test duration',
      duration: '4500'
    })
    await later()
    expect(document.querySelector('.fect-toast')).toBeTruthy()
  })

  it('static function call', async () => {
    Toast.success({ text: 'toast type is success' })
    Toast.warning({ text: 'toast type is warning' })
    Toast.error({ text: 'toast type is error' })
    await later()
    expect(document.querySelector('.fect-toast--success')).toBeTruthy()
    expect(document.querySelector('.fect-toast--warning')).toBeTruthy()
    expect(document.querySelector('.fect-toast--error')).toBeTruthy()
  })

  it('placement', async () => {
    Toast({
      text: 'topRight',
      placement: 'topRight'
    })
    await later()
    expect(document.querySelector('.fect-toast__container--top')).toBeTruthy()
    await later()
    Toast({
      text: 'bottomLeft',
      placement: 'bottomLeft'
    })
    await later()
    expect(document.querySelector('.fect-toast__container--left')).toBeTruthy()
  })

  it('removeAll', async () => {
    make(5).forEach((_, i) => {
      Toast({
        text: i + ''
      })
    })
    Toast.removeAll()
    await later()
    expect(document.querySelector('.fect-toast__container')?.childElementCount).toBe(0)
  })
})
