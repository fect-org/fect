/**
 * mock file
 * blog: https://blog.unsweets.net/entries/set-filelist-to-htmlinputelement-files/
 */

import { mount } from '@vue/test-utils'
import { Upload } from '..'
import { ExtractPropTypes } from 'vue'
import { props as _props } from '../props'
import { later } from '../../../tests'
import { AfterReadFn, BeforeReadFn } from '../interface'

const mockGetFile = (el: HTMLInputElement, files: File | File[]) => {
  Object.defineProperty(el, 'files', {
    get: jest.fn().mockReturnValue(files)
  })
}

const _mount = (props: Partial<ExtractPropTypes<typeof _props>>) =>
  mount(Upload, {
    slots: {
      default: () => <div role="button">Button</div>
    },
    props
  })

describe('Upload', () => {
  it('should supprort normal props', async () => {
    const afterRead = jest.fn()
    const wrapper = _mount({ disabled: true, afterRead })
    const btn = wrapper.find('div')
    await btn.trigger('click')
    expect(afterRead).toHaveBeenCalledTimes(0)
  })
  it('should limit upload count', async () => {
    const assets: any[] = [1, 2, 3]
    const afterRead: AfterReadFn = (files) => {
      assets.push(files)
      return true
    }
    const wrapper = _mount({ limit: 3, assets, afterRead })
    const input = wrapper.find('input')
    const fileList = [new File(['content'], 'test-file.txt'), new File(['content'], 'test-file.txt')]
    mockGetFile(input.element, fileList)
    await input.trigger('change')
    expect(wrapper.emitted('exceed')).toBeTruthy()
    expect(assets.length).toBe(3)
    assets.length = 0
    await input.trigger('change')
    expect(assets.length).toBe(1)
  })
  it('should be support beforeRead return false', async () => {
    const afterRead = jest.fn()
    const beforeRead = jest.fn()
    beforeRead.mockImplementation(() => false)
    const wrapper = _mount({ beforeRead, afterRead })
    const fileList = [new File(['content'], 'test-file.txt'), new File(['content'], 'test-file.txt')]
    const input = wrapper.find('input')
    mockGetFile(input.element, fileList)
    input.trigger('change')
    await later()
    expect(afterRead).toHaveBeenCalledTimes(0)
  })
  it('The event should be skipped when there is no file', () => {
    const wrapper = _mount({})
    const input = wrapper.find('input')
    input.trigger('change')
  })
  it('beforeRead sould be support promise', async () => {
    const afterRead = jest.fn()
    const beforeRead: BeforeReadFn = (file) => new Promise((resolve) => resolve(file))
    const wrapper = _mount({ beforeRead, afterRead })
    const fileList = [new File(['content'], 'test-file.txt'), new File(['content'], 'test-file.txt')]
    const input = wrapper.find('input')
    mockGetFile(input.element, fileList)
    input.trigger('change')
    await later()
    expect(afterRead).toHaveBeenCalledTimes(1)
  })
  it('before read return promise and reject', async () => {
    const afterRead = jest.fn()
    const wrapper = _mount({
      beforeRead: () =>
        new Promise<undefined>((_, reject) => {
          reject()
        }),
      afterRead
    })
    const fileList = [new File(['content'], 'test-file.txt'), new File(['content'], 'test-file.txt')]
    const input = wrapper.find('input')
    mockGetFile(input.element, fileList)
    input.trigger('change')
    await later()
    expect(afterRead).toHaveBeenCalledTimes(0)
  })
})
